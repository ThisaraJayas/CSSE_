import React, { useState, useCallback } from "react";
import TabBar from "../components/TabBar";
import QRLinkCard from "../components/QRLinkCard";
import TabSection from "../components/TabSection";
import QRScanner from "../components/QRScanner"; // Import the QRScanner component
import axios from "axios";
import { Link } from "react-router-dom";

const BinCollection = () => {
  const [activeTab, setActiveTab] = useState("Collect");
  const [isScanning, setIsScanning] = useState(false); // State to manage scanning mode
  const [binData, setBinData] = useState(null); // State to store scanned bin data
  const [openWeightModel, setOpenWeightModel] = useState(false);
  const [success, setSuccess] = useState(false);
  const [weight, setWeight] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleContinue = () => {
    setIsScanning(true); // Activate scanning mode on continue button click
  };

  const onWeightSubmit = useCallback(async () => {
    const response = await axios.put(
      `http://localhost:4000/api/bins/${binData}/weight`,
      {
        weight: parseFloat(weight),
      }
    );

    if (response.data) {
      setBinData(null);
      setWeight(null);
      setOpenWeightModel(false);
      setSuccess(true);
    }
  }, [binData, weight]);

  return (
    <div className="bin-collection-page flex flex-col min-h-screen">
      <header className="page-header flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Bins..."
            className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="search-button text-2xl text-blue-500 hover:text-blue-700 transition">
            🔍
          </button>
        </div>
      </header>

      <div className="fixed top-14 left-0 right-0 z-10">
        <TabSection activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="pt-28 pb-4"></div>
      <QRLinkCard />

      {isScanning ? (
        <QRScanner
          onScanComplete={(data) => {
            setBinData(data);
            setIsScanning(false);
            setOpenWeightModel(true);
          }}
          onClose={() => setIsScanning(false)}
        />
      ) : (
        <div className="button-container flex justify-center mb-4">
          <button
            className="continue-button w-3/4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      )}
      {openWeightModel && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="modal-content bg-white rounded-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-lg font-semibold mb-4">Add weight</h2>
            <label htmlFor="name" className="block mb-2">
              Weight (KG)
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter weight in KG"
              required
            />
            <button
              className="close-button mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={onWeightSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {success && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="modal-content bg-white rounded-lg p-6 max-w-md w-full mx-auto">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-12 h-12 text-green-500 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-lg font-semibold mb-4 mx-auto">
                {weight ?? 0} kg added successfully
              </h2>
            </div>
            <Link to="/">
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      )}
      <TabBar />
    </div>
  );
};

export default BinCollection;
