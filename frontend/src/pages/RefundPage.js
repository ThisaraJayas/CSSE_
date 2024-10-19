import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function RefundPage() {
  const [refundData, setRefundData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/refunds');
        setRefundData(response.data);
      } catch (error) {
        console.error('Error fetching refund data:', error);
      }
    };

    fetchRefunds();
  }, []);

  // Calculate the index range for the rows to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = refundData.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total number of pages
  const totalPages = Math.ceil(refundData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const updateRefundStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:4000/api/refund/${id}`, { status });
      setRefundData((prevData) =>
        prevData.map((refund) =>
          refund._id === id ? { ...refund, status } : refund
        )
      );
    } catch (error) {
      console.error('Error updating refund status:', error);
    }
  };

  const exportToPDF = async () => {
    // Select the table element
    const table = document.getElementById('refund-table');
    
    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 190; // Set width of the image in PDF
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    position += heightLeft;

    // Adding new pages for images taller than page height
    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    }

    pdf.save('refund_data.pdf');
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="w-full bg-blue-600 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Title on the Left */}
          <h1 className="text-2xl font-bold text-white">Pending Refunds</h1>
          {/* Export Button on the Right */}
          <button 
            onClick={exportToPDF}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
          >
            Export
          </button>
        </div>
      </nav>

      {/* Table Section */}
      <div className="p-10">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden">
            <table id="refund-table" className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Refund
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((item) => (
                  <tr key={item._id} className="bg-white">
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.userId.name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{format(new Date(item.date), 'MMMM dd, yyyy HH:mm:ss')}</td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.amount}</td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span className={`${item.status === 'Pending' ? 'text-yellow-500' : item.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <button 
                        className="bg-gray-200 text-blue-600 rounded-lg px-4 py-1 mr-2"
                        onClick={() => updateRefundStatus(item._id, 'Accepted')}
                        disabled={item.status !== 'Pending'}
                      >
                        Accept
                      </button>
                      <button 
                        className="bg-gray-200 text-red-600 rounded-lg px-4 py-1"
                        onClick={() => updateRefundStatus(item._id, 'Rejected')}
                        disabled={item.status !== 'Pending'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 px-5">
              <button 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1}
                className={`bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>
              <div className="flex space-x-1">
                {[...Array(totalPages).keys()].map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number + 1)}
                    className={`px-3 py-1 rounded-lg ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className={`bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
