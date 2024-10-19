import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import spinner

export default function RefundDialog({ isOpen, onClose, onSubmit, userId }) {
  const [refundAmount, setRefundAmount] = useState('');
  const [refundNote, setRefundNote] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage submission status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner

    const refundData = {
      amount: refundAmount,
      note: refundNote,
      userId,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/refund', refundData);
      console.log('Refund saved:', response.data);
      onSubmit(refundData);
      setIsSubmitted(true); // Set to submitted after success
    } catch (error) {
      console.error('Error submitting refund:', error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }

    setRefundAmount('');
    setRefundNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Request Refund</h2>

        {/* Show loading spinner */}
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <ClipLoader color="#4A90E2" size={50} />
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit}>
            {/* Refund Amount */}
            <div className="mb-4">
              <label className="block text-gray-600 text-lg mb-2">Refund Amount (LKR)</label>
              <input
                type="number"
                placeholder="Enter refund amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                required
              />
            </div>

            {/* Refund Note */}
            <div className="mb-6">
              <label className="block text-gray-600 text-lg mb-2">Note</label>
              <textarea
                placeholder="Enter a note"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={refundNote}
                onChange={(e) => setRefundNote(e.target.value)}
                rows={3}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${
                  isSubmitted ? 'bg-green-500' : 'bg-blue-500'
                } text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300`}
              >
                {isSubmitted ? 'Submitted' : 'Submit Refund'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
