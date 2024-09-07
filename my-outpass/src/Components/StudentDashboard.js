
import React, { useState, useEffect } from 'react';

import OutpassForm from './OutpassForm';
import api from '../api/api';

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


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <OutpassForm onSubmit={handleOutpassSubmit} />
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Your Outpasses</h3>
        {outpasses.length === 0 ? (
          <p>No outpasses submitted yet.</p>
        ) : (
          outpasses.map((outpass) => (
            <div key={outpass._id} className="bg-white p-4 rounded shadow-md mb-4">
              <p><strong>Name:</strong> {outpass.name}</p>
              <p><strong>Hostel Name:</strong> {outpass.hostelName}</p>
              <p><strong>Leaving Date:</strong> {new Date(outpass.leavingDate).toLocaleDateString()}</p>
              <p><strong>Leaving Time:</strong> {outpass.leavingTime}</p>
              <p><strong>Returning Date:</strong> {new Date(outpass.returningDate).toLocaleDateString()}</p>
              <p><strong>Returning Time:</strong> {outpass.returningTime}</p>
              <p><strong>Status:</strong> {outpass.status}</p>
            </div>
          ))
        )}
      </div>
    </div>


 
  );
};

export default StudentDashboard;








