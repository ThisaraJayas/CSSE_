import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function WasteRequestsTable() {
    const [wasteRequests, setWasteRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null); // State for error messages
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchWasteRequests = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/waste-requests`);
                const data = await response.json();
                setWasteRequests(data.wasteRequests);
            } catch (error) {
                console.error('Error fetching waste requests:', error);
                setError('Error fetching waste requests'); // Set error message on fetch failure
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchWasteRequests();
    }, []);

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = wasteRequests.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(wasteRequests.length / rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleView = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const updateStatus = async (requestId, newStatus) => {
        try {
            await fetch(`http://localhost:4000/api/waste-requests/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            // Update local state
            setWasteRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === requestId ? { ...request, status: newStatus } : request
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Error updating status'); // Set error message on update failure
        }
    };

    return (
        <div>
            <nav className="w-full bg-blue-600 py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold text-white">Waste Request Management</h1>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
                        Home
                    </button>
                </div>
            </nav>
            <div className="p-10">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        {loading ? ( // Show loading indicator
                            <p className="text-center">Loading...</p>
                        ) : (
                            <>
                                {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error messages */}
                                <table className="min-w-full leading-normal">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Bin ID
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Notes
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRows.map((item) => (
                                            <tr key={item._id} className="bg-white">
                                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                    {item.binId}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                    {format(new Date(item.date), 'MMMM dd, yyyy')}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                    {item.notes}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                    {item.status}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                    <button
                                                        onClick={() => updateStatus(item._id, 'Completed')}
                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Complete
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(item._id, 'Canceled')}
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleView(item)}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination controls */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* Modal for viewing request details */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-2">Waste Request Details</h2>
                            {selectedRequest && (
                                <div>
                                    <p><strong>Bin ID:</strong> {selectedRequest.binId}</p>
                                    <p><strong>Date:</strong> {format(new Date(selectedRequest.date), 'MMMM dd, yyyy')}</p>
                                    <p><strong>Notes:</strong> {selectedRequest.notes}</p>
                                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                                </div>
                            )}
                            <button onClick={closeModal} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
