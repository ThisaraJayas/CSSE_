import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaTrash, FaEnvelope, FaUser, FaCreditCard } from 'react-icons/fa';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('Collection'); // Default active tab

  const tabs = [
    { name: 'Collection', icon: <FaTrash />, path: '/collections' },
    { name: 'Requests', icon: <FaEnvelope />, path: '/requests' },
    { name: 'Payments', icon: <FaCreditCard />, path: '/payments' },
    { name: 'Garbage', icon: <FaEnvelope />, path: '/wastecollection' },

  ];

  return (
    <div className="tab-bar flex justify-around items-center bg-gray-800 text-white py-3 shadow-lg">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.path} // Navigate to the path
          className="tab-item flex flex-col items-center cursor-pointer transition-all duration-300"
          onClick={() => setActiveTab(tab.name)} // Set active tab
        >
          {/* Change icon color based on active state */}
          {React.cloneElement(tab.icon, {
            className: `text-xl md:text-3xl mb-1 ${
              activeTab === tab.name ? 'text-blue-500' : 'text-gray-300'
            }`,
          })}
          <span
            className={`text-sm md:text-base ${
              activeTab === tab.name ? 'text-blue-500' : 'text-gray-300'
            }`}
          >
            {tab.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
