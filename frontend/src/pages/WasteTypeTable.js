import React, { useEffect, useState } from 'react';
import { useAuth } from '../middleware/AuthContext';
import { format } from 'date-fns';

export default function WasteTypesTable() {
    const { user } = useAuth(); // Assuming you're using user for authentication context
    const [wasteData, setWasteData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6; // This can be set as a state if you want it to be dynamic
    const [selectedWasteType, setSelectedWasteType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchWasteTypes = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/waste-types'); // Your API endpoint
                const data = await response.json();
                setWasteData(data);
            } catch (error) {
                console.error('Error fetching waste types:', error);
            }
        };

        fetchWasteTypes();
    }, []);

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = wasteData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(wasteData.length / rowsPerPage);
console.log(currentRows);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleView = (wasteType) => {
        setSelectedWasteType(wasteType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWasteType(null);
    };

    return (
        <div>
            <nav className="w-full bg-blue-600 py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold text-white">Waste Type Management</h1>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
                        Home
                    </button>
                </div>
            </nav>
            <div className="p-10">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Rate (LKR)
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Payable Type
                                    </th>
                                    
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Total Weight
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((item, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {item.typeName} {/* Change this to item.typeName if using new structure */}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {item.rate}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {format(new Date(item.createdAt), 'MMMM dd, yyyy ')} 
                                        </td>
                                        
                                        <td className={`px-5 py-5 border-b border-gray-200 text-sm ${item.color}`}>
                                            {item.maxWeight}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <button
                                                className="bg-gray-200 text-blue-600 rounded-lg px-4 py-1"
                                                onClick={() => handleView(item)}>
                                                View
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

            {/* Modal for Viewing Waste Type Details */}
            {isModalOpen && selectedWasteType && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold">{selectedWasteType.type}</h2>
                        <p><strong>Rate:</strong> {selectedWasteType.rate} LKR</p>
                        <p><strong>Type Name:</strong> {selectedWasteType.typeName}</p>
                        <p><strong>Deescription :</strong> {selectedWasteType.description}</p>
                        <p><strong>Total Weight:</strong> {selectedWasteType.maxWeight}</p>
                        <p><strong>Date Added:</strong>{format(new Date(selectedWasteType.createdAt), 'MMMM dd, yyyy ')} </p>
                        <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
