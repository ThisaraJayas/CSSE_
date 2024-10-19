import React, {useEffect, useRef, useState } from 'react';
import TabSection from '../components/TabSection';
import TabBar from '../components/TabBar';
import Modal from '../components/PaymentDialog'; // Import the Modal component
import { Link } from 'react-router-dom';
import RefundDialog from '../components/RefundDialog';
import { useAuth } from '../middleware/AuthContext';
import StatusDialog from '../components/StatusDialog'

export default function PaymentList() {
  const [activeTab, setActiveTab] = useState('Payments');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // State to hold selected payment details
  const [isMenuOpen, setMenuOpen] = useState(false); //nav
  const dropdownRef = useRef(null);
  const [isRefundDialogOpen, setRefundDialogOpen] = useState(false);
  const [isStatusDialogOpen, setStatusDialogOpen] = useState(false);
  const { user, loading } = useAuth();
  const userId = user?._id
   // Toggle the profile dropdown menu
   // Toggle profile dropdown
   const toggleMenu = () => setMenuOpen(!isMenuOpen);

   // Handle click outside dropdown
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setMenuOpen(false);
       }
     };
     document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);
 
   // Open refund dialog
   const handleRefundClick = () => {
     setRefundDialogOpen(true);
   };
   const handleStatusClick = () => {
    setStatusDialogOpen(true); // Open Status dialog
  };
   // Handle refund form submission
   const handleRefundSubmit = (refundData) => {
     console.log('Refund submitted:', refundData);
     setRefundDialogOpen(false); // Close the dialog after submitting
   };
    // Function to handle Pay Now button click
  const handlePayNowClick = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true); // Open the modal
  };
 
   // Handle tab change
   const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <>
     <div className="payment-page flex flex-col min-h-screen bg-gray-50">
        {/* Header Section */}
        <header className="fixed  top-0 left-0 right-0 z-20 page-header flex justify-between items-center p-4 bg-white ">
        <h2 className="text-xl font-bold">Payments</h2>

        {/* Profile Icon and Dropdown */}
        <div className="relative  hidden md:block"> {/* Hide on small screens */}
          <button
            className="profile-button text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {/* Profile icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A10.969 10.969 0 0112 15c2.576 0 4.927.896 6.879 2.404M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2a10 10 0 110 20 10 10 0 010-20z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
  <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-30">
    <ul className="py-2">
      <Link to="/collection">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Collections')}>
          Collection
        </li>
      </Link>
      <Link to="/request">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Request')}>
          Request
        </li>
      </Link>
      <Link to="/profile">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Profile')}>
          Profile
        </li>
      </Link>
      <Link to="/payments">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Payments')}>
          Payments
        </li>
      </Link>
      <Link to="/dashboard">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
          Dashboard
        </li>
      </Link>
    </ul>
  </div>
)}
        </div>
      </header>

      {/* Tab Section */}
      <div className="fixed top-14 left-0 right-0 z-10">
        <TabSection activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

        {/* Spacer for header and tab section */}
        <div className="pt-20"></div>

        <div className="flex justify-between items-center m-2 mb-4">
          <div className="flex space-x-2 items-center">
            <button className="bg-white text-white px-3 py-1 rounded-lg flex items-center">
              <span className="mr-2"></span>
            </button>
          </div>
          <div className="flex space-x-2">
            <button onClick={handleStatusClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              Status
            </button>
            <button onClick={handleRefundClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              Request Refund
            </button>
          </div>
        </div>
        <div className="pt-18"></div>

        {/* Main Content */}
        <div className="flex-1 w-full max-w-lg mx-auto m-5 mt-6">
          {/* Pending Payment Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-4 mx-4 sm:mx-0 flex justify-between items-center">
            <div>
              <h3 className="text-gray-800 text-lg font-semibold">LKR 1,105.00</h3>
              <p className="text-gray-500">Pending Payment</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
              onClick={() => handlePayNowClick({ amount: 'LKR 1,105.00', status: 'Pending', date: 'N/A' })} // Pass payment details
            >
              Pay Now
            </button>
          </div>

          <RefundDialog
            isOpen={isRefundDialogOpen}
            onClose={() => setRefundDialogOpen(false)}
            onSubmit={handleRefundSubmit}
            userId={userId}
          />

          {/* Completed Payment Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 mx-4 sm:mx-0">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 text-lg font-semibold">LKR 1,245.00</h3>
              <p className="text-gray-400 text-sm">Payment Date</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-green-500 font-semibold">Completed</p>
              <p className="text-gray-500 text-sm">04th July 2024</p>
            </div>
          </div>

          {/* Completed Payment Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 mx-4 sm:mx-0">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 text-lg font-semibold">LKR 1,893.25</h3>
              <p className="text-gray-400 text-sm">Requested Date</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-green-500 font-semibold">Completed</p>
              <p className="text-gray-500 text-sm">01st August 2024</p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="small-spacer py-4"></div>

        {/* Bottom Tab Bar */}
        <div className="md:hidden block"></div>

        {/* Modal for payment details */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
          paymentDetails={selectedPayment} 
        />

        {/* Status Dialog */}
        <StatusDialog 
          isOpen={isStatusDialogOpen} 
          onClose={() => setStatusDialogOpen(false)} 
        />
      </div>

      <TabBar />
    </>
  );
}
