import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaTrash, FaUser, FaCog, FaClipboardList, FaHome, FaMoneyBill } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/dashboard/wastetype"
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaClipboardList className="mr-1" /> My Waste
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/managerefund"
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaTrash className="mr-1" /> Manage Bin
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/refund"
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaMoneyBill className="mr-1" /> Refund
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addwaste"
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaCog className="mr-1" /> Add WasteType
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaHome className="mr-1" /> Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="mt-4 bg-white rounded-lg shadow-md p-4">
          <Outlet /> {/* This will render the matched child route */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
