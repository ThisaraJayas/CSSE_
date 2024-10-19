import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { format } from 'date-fns';

const StatusDialog = ({ isOpen, onClose }) => {
  const [refundData, setRefundData] = useState([]);

  // Fetch refund data when the dialog opens
  useEffect(() => {
    const fetchRefunds = async () => {
      if (isOpen) {
        try {
          const response = await axios.get('http://localhost:4000/api/refunds');
          setRefundData(response.data);
        } catch (error) {
          console.error('Error fetching refund data:', error);
        }
      }
    };

    fetchRefunds();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
        
        {/* Add your payment cards here */}
        <div className="mb-4">
          {refundData.map((item) => {
            // Determine the color class based on the status
            let statusClass;
            switch (item.status) {
              case 'Accepted':
                statusClass = 'text-green-500';
                break;
              case 'Pending':
                statusClass = 'text-blue-500';
                break;
              case 'Rejected':
                statusClass = 'text-red-500';
                break;
              default:
                statusClass = 'text-gray-500'; // Fallback class
            }

            return (
              <div key={item._id} className="bg-blue-50 p-4 rounded-lg shadow-md mb-2">
                <h4 className="text-gray-800 text-lg font-semibold">{`LKR ${item.amount.toFixed(2)}`}</h4>
                <p className={`font-semibold ${statusClass}`}>
                  {item.status}
                </p>
                <p className="text-gray-500 text-sm">
                  {format(new Date(item.date), 'MMMM dd, yyyy')}
                </p>
              </div>
            );
          })}
        </div>
        
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

StatusDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatusDialog;
