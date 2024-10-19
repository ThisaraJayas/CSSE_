import React, { useState } from "react";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";

const QRScanner = ({ onScanComplete, onClose }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      onScanComplete(data);
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <div className="qr-scanner-container flex flex-col items-center justify-center">
      <button onClick={onClose} className="close-button text-red-500 mb-4">
        Close
      </button>
      <div className="w-96">
        <BarcodeScanner
          onSuccess={(text) => handleScan(text)}
          onError={(error) => {
            if (error) {
              handleError(error.message);
            }
          }}
          containerStyle={{ width: "100%" }}
        />
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default QRScanner;
