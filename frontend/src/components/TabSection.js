import React from "react";
import { useNavigate } from "react-router-dom";

const TabSection = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const tabs = ["Home", "Bin", "Collections", "Payments", "WasteCollection"];

  const handleTabChange = (tab) => {
    onTabChange(tab);
    // Change the URL based on the selected tab
    switch (tab) {
      case "Home":
        navigate("/home");
        break;
      case "Bin":
        navigate("/bin");
        break;
      case "Collections":
        navigate("/collections");
        break;
      case "Payments":
        navigate("/payments");
        break;
      case "WasteCollection":
        navigate("/wastecollection");
        break;
      default:
        break;
    }
  };
  return (
    <div className="tab-section flex justify-start items-center gap-0 pt-1 p-0 bg-blue-200 shadow-md m-2 overflow-x-auto">
      {/* Ensure horizontal scrolling on small screens */}
      <div className="flex space-x-0 md:space-x-0 w-full">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab py-3 px-4 text-base font-semibold tracking-wide cursor-pointer transition-all duration-300 whitespace-nowrap w-full text-center ${
              activeTab === tab
                ? "bg-blue-400 text-white shadow-md"
                : "text-blue-800 hover:bg-blue-300 active:bg-blue-300"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSection;
