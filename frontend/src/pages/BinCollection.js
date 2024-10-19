import React, { useState, useCallback } from "react";
import TabBar from "../components/TabBar";
import QRLinkCard from "../components/QRLinkCard";
import TabSection from "../components/TabSection";
import QRScanner from "../components/QRScanner"; // Import the QRScanner component
import axios from "axios";

const BinCollection = () => {
  const [activeTab, setActiveTab] = useState("Collect");
  const [isScanning, setIsScanning] = useState(false); // State to manage scanning mode
  const [binData, setBinData] = useState(null); // State to store scanned bin data
  const [openWeightModel, setOpenWeightModel] = useState(false);
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
              className="close-button mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
              onClick={onWeightSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <TabBar />
    </div>
  );
};

export default BinCollection;
