import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useAuth } from '../middleware/AuthContext';
import API_ENDPOINTS from '../config';
import { AuthContext } from '../middleware/AuthContext';

const AddBin = () => {
  const [name, setName] = useState('');
  const [binType, setBinType] = useState('');
  const [location, setLocation] = useState({ lat: 6.9271, lng: 79.8612 });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!loading && !user) {
      setError('No authentication token found. Please sign in.');
      navigate('/signin');
    }
  }, [navigate, user, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!user) {
      setError('User ID is missing. Please try signing in again.');
      return;
    }

    const newBin = {
      ownerId: user._id,
      binType,
      location,
      name,
    };
    console.log(newBin);

    try {
      await axios.post(API_ENDPOINTS.ADD_BIN, newBin, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/submit-review');
    } catch (error) {
      console.error('Error adding bin:', error);
      setError('Failed to add bin. Please try again later.');
    }
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex items-center text-gray-700"
        >
          <span className="material-icons">arrow_back</span>
          Back
        </button>
        <h2 className="text-2xl font-bold">Add New Bin</h2>
        <div className="flex items-center">
          {/* Add any additional items here */}
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Bin Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter bin name"
            required
          />
        </div>
        <div>
          <label htmlFor="binType" className="block mb-2">
            Bin Type
          </label>
          <select
            id="binType"
            value={binType}
            onChange={(e) => setBinType(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select bin type</option>
            <option value="Recycling">Recycling</option>
            <option value="Waste">Waste</option>
            <option value="Compost">Compost</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Select Location</label>
          <GoogleMap
            mapContainerClassName="w-full h-64"
            center={location}
            zoom={10}
            onClick={handleMapClick}
          >
            <Marker position={location} />
          </GoogleMap>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Bin
        </button>
      </form>
    </div>
  );
};

export default AddBin;
