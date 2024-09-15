import React, { useState, useEffect } from 'react';
import OutpassForm from './OutpassForm';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';


const StudentDashboard = () => {
  const [outpasses, setOutpasses] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('apply');
  const { currentUser } = useAuth();
console.log("currentUser: " ,currentUser);
  const handleOutpassSubmit = (newOutpass) => {
    setOutpasses([...outpasses, newOutpass]);
    // setOutpasses([newOutpass]);
  };
  
// console.log("outpasses in student dashboard: " ,outpasses);
  useEffect(() => {
    if (currentUser) {
      fetchOutpasses();
    }
  }, [currentUser]);


  const fetchOutpasses = async () => {
    try {
      if (currentUser && currentUser.id) {
      console.log('Fetching outpasses for student ID:', currentUser.id);
      const response = await api.get('/api/outpasses');
      // const response = await api.get(`/api/outpasses/student/${currentUser.id}`);
      // const filteredOutpasses = response.data.filter(outpass => outpass.student === currentUser.id);
      // const filteredOutpasses = response.data.filter(outpass => 
      //   outpass.student.toString().trim() === currentUser.id.toString().trim()
      // );
      const filteredOutpasses = response.data.filter(outpass => 
        outpass && outpass.student && outpass.student.toString() === currentUser.id
      );
      
      console.log('Filter id: ', currentUser.id);
      console.log('Fetched outpasses:', response.data);
      
      // setOutpasses(response.data);
      setOutpasses(filteredOutpasses); 
      console.log('Filtered outpasses:', filteredOutpasses);
      // Here, filteredOutpasses is used to update state

    } else {
      console.log('Current user not available yet');
    } }
    catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  };

  const handleRemove = (id) => {
    setOutpasses(outpasses.filter((outpass) => outpass._id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'apply' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('apply')}
          >
            Apply for Outpass
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'view' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            View Outpasses
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${activeTab === 'apply' ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <OutpassForm onSubmit={handleOutpassSubmit} />
      </div>

      <div className={`transition-opacity duration-300 ${activeTab === 'view' ? 'opacity-100' : 'opacity-0 hidden'}`}>
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