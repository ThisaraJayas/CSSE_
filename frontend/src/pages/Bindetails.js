import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract URL parameters
import axios from 'axios';
import API_ENDPOINTS from '../config';

const BinDetails = () => {
  const { binId } = useParams(); // Get binId from the URL
  const [bin, setBin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBinDetails = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.VERIFY_BIN(binId)); // Using the API endpoint with binId
        setBin(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bin details');
        setLoading(false);
      }
    };

    fetchBinDetails();
  }, [binId]);

  if (loading) {
    return <p>Loading bin details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!bin) {
    return <p>No bin details found.</p>;
  }

  return (
    <div className="bin-details bg-white shadow-md rounded-lg p-4 mx-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Bin Details</h3>
      <div className="bin-info mb-4">
        <p className="text-gray-700 font-medium">Bin Type: {bin.binType}</p>
        <p className="text-sm text-gray-500">
          Location: Latitude {bin.location.lat}, Longitude {bin.location.lng}
        </p>
        <p className="text-sm text-gray-500">Owner ID: {bin.ownerId}</p>
        <p className="text-sm text-gray-500">
          Status: {bin.isVerified ? 'Verified' : 'Not Verified'}
        </p>
      </div>
      {bin.qrCode && (
        <div className="qr-code-section mt-4">
          <img src={bin.qrCode} alt="QR Code" className="w-24 h-24" />
        </div>
      )}
    </div>
  );
};

export default BinDetails;
