
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import OutpassForm from './OutpassForm';
import api from '../api';

const StudentDashboard = () => {
  const [outpasses, setOutpasses] = useState([]);
  const handleOutpassSubmit = (newOutpass) => {
    setOutpasses([...outpasses, newOutpass]);
  };

  useEffect(() => {
 
    fetchOutpasses();
  }, []);

    
    const fetchOutpasses = async () => {
      try {
        const response = await api.get('/api/outpasses/');
        setOutpasses(response.data);
      } catch (error) {
        console.error('Error fetching outpasses:', error);
      }
    };

    const handleRemove = (id) => {
      setOutpasses(outpasses.filter((outpass) => outpass._id !== id));
    };
      return (
        <div className="max-w-md mx-auto p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
          <OutpassForm onSubmit={handleOutpassSubmit} />
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Your Outpasses</h3>
            {outpasses.length === 0 ? (
              <p>No outpasses submitted yet.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {outpasses.map((outpass) => (
                  <div key={outpass._id} className="bg-white p-4 rounded shadow-md relative">
                    <button onClick={() => handleRemove(outpass._id)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                      ×
                    </button>
                    <p><strong>Name:</strong> {outpass.name}</p>
                    <p><strong>Hostel Name:</strong> {outpass.hostelName}</p>
                    <p><strong>Leaving Date:</strong> {new Date(outpass.leavingDate).toLocaleDateString()}</p>
                    <p><strong>Leaving Time:</strong> {outpass.leavingTime}</p>
                    <p><strong>Returning Date:</strong> {new Date(outpass.returningDate).toLocaleDateString()}</p>
                    <p><strong>Returning Time:</strong> {outpass.returningTime}</p>
                    <p><strong>Status:</strong> {outpass.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
};

export default StudentDashboard;