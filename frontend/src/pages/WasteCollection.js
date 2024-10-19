import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add Axios for API requests
import MapComponent from '../components/MapComponent';
import DateSelector from '../components/DateSelector';
import { useAuth } from '../middleware/AuthContext';
import API_ENDPOINTS from '../config';
import { useNavigate } from 'react-router-dom';

const SpeWasteCollection = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState('');
  const [bins, setBins] = useState([]);
  const [selectedBinId, setSelectedBinId] = useState('');
  const [error, setError] = useState(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  console.log("SDD,", selectedDate, selectedLocation, selectedBinId);

  // Function to submit the waste collection request
  const submitWasteCollectionRequest = async () => {
    if (!selectedBinId || !selectedDate || !notes) {
      setError('All fields are required. Please select a bin, date, and add notes.');
      return; // Return early if any field is empty
    }

    const requestData = {
      binId: selectedBinId,
      date: selectedDate,
      notes: notes,
      userId: user._id
    };
    console.log("Request Data:", requestData);

    try {
      const token = localStorage.getItem('token'); // Retrieve the auth token
      // if (!token) {
      //   setError('No token found. Please log in.');
      //   navigate('/signin');
      //   return;
      // }

      // Send the POST request to the server
      const response = await axios.post(API_ENDPOINTS.POST_WASTE_COLLECTION, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", response.data);

      // Handle the response from the API
      if (response.data.success) {
        setError(null); // Clear any previous error
        console.log('Request successful:', response.data);
        alert('Waste collection request submitted successfully!');
        navigate('/dashboard'); // Or any other page after successful submission
      } else {
        setError('Failed to submit waste collection request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchBins = async () => {
      console.log('User object:', user); // Debugging statement to check user object

      // Check for user authentication
      // if (!user) {
      //   setError('User not authenticated. Please log in.');
      //   navigate('/signin');
      //   return;
      // }

      try {
        const token = localStorage.getItem('token');
        // if (!token) {
        //   setError('No token found. Please log in.');
        //   navigate('/signin');
        //   return;
        // }

        // Fetch all bins from the API
        const response = await axios.get(API_ENDPOINTS.GET_BINS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBins(response.data);
      } catch (error) {
        console.error('Error fetching bins:', error);
        setError('Failed to fetch bins. Please try again later.');
      }
    };

    fetchBins();
  }, [user, navigate]);

  const handleBinSelect = (event) => {
    const binId = event.target.value;
    setSelectedBinId(binId);

    // Find the selected bin's location and update the map
    const selectedBin = bins.find((bin) => bin._id === binId);
    if (selectedBin) {
      setSelectedLocation({
        lat: selectedBin.location.lat,
        lng: selectedBin.location.lng,
      });
    }
  };

  const handleRequest = () => {
    // Call the function to submit the waste collection request
    submitWasteCollectionRequest();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Waste Collection Request</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map section */}
        <div className="lg:h-[500px] h-[300px] flex flex-col justify-start">
          <h2 className="text-lg font-semibold mt-9 mb-4">Pin Bin Location</h2>
          <MapComponent setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} />
        </div>

        {/* Form section */}
        <div className="flex flex-col space-y-6 mt-36 lg:mt-8 w-full">
          {/* Bin Selector */}
          <div className="flex flex-col space-y-2 w-full">
            <h2 className="text-lg font-semibold">Select Bin</h2>
            <select
              value={selectedBinId}
              onChange={handleBinSelect}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 w-full"
            >
              <option value="">Select a Bin</option>
              {bins.map((bin) => (
                <option key={bin._id} value={bin._id}>
                  Bin ID: {bin._id}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col space-y-2 w-full">
            <h2 className="text-lg font-semibold">Request Date</h2>
            <DateSelector setDate={setSelectedDate} />
          </div>

          {/* Notes */}
          <div className="flex flex-col space-y-2 w-full">
            <h2 className="text-lg font-semibold">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special notes..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleRequest}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeWasteCollection;
