// import React, { useEffect, useState } from 'react';
// import outpassService from '../Services/outpassService';

// function WardenDashboard() {
//   const [outpasses, setOutpasses] = useState([]);

//   useEffect(() => {
//     const fetchOutpasses = async () => {
//       const data = await outpassService.getOutpassesForWarden();
//       setOutpasses(data);
//     };
//     fetchOutpasses();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Warden Dashboard</h2>
//       {/* Render list of outpasses with status and approve button */}
//     </div>
//   );
// }
// // Assuming you have wardenId from local storage or user context
// ;

// export default WardenDashboard;


import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '../api/axios';

const WardenDashboard = ({ hostel }) => {
  const [outpasses, setOutpasses] = useState([]);

  //cody
  useEffect(() => {
    fetchOutpasses();
  }, [ hostel ]);

  const fetchOutpasses = async () => {
    try {
      const response = await api.get(`/api/outpasses?hostel=${hostel}&status=pending`);
      setOutpasses(response.data);
    } catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  };

  // useEffect(() => {
  //   const fetchOutpasses = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/outpass/${hostelName}`);
  //       setOutpasses(response.data);
  //     } catch (error) {
  //       console.error('Error fetching outpasses:', error);
  //     }
  //   };
  //   fetchOutpasses();
  // }, [hostelName]);

  // const handleStatusChange = async (id, status) => {
  //   try {
      // await axios.patch(`http://localhost:5000/api/outpass/${id}`, { status });
      // setOutpasses((prevOutpasses) => prevOutpasses.map(outpass => outpass._id === id ? { ...outpass, status } : outpass));
      //cody
      // await api.put(`/api/outpass/${id}`, { status: 'approved' });
  //     fetchOutpasses();
  //   } catch (error) {
  //     console.error('Error approving outpass status:', error);
  //   }
  // };

  //cody
  const handleReject = async (id) => {
    try {
      await api.put(`/api/outpass/${id}`, { status: 'rejected' });
      fetchOutpasses();
    } catch (error) {
      console.error('Error rejecting outpass:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/outpass/${id}`, { status: 'approved' });
      fetchOutpasses();
    } catch (error) {
      console.error('Error approving outpass:', error);
    }
  };

  return (
    // <div>
    //   <h3 className="text-xl font-bold mb-4">Warden Dashboard</h3>
    //   {outpasses.length === 0 ? (
    //     <p>No pending requests.</p>
    //   ) : (
    //     outpasses.map((outpass) => (
    //       <div key={outpass._id} className="bg-white p-4 rounded shadow-md mb-4">
    //         <p><strong>Name:</strong> {outpass.name}</p>
    //         <p><strong>Hostel Name:</strong> {outpass.hostelName}</p>
    //         <p><strong>Leaving Date:</strong> {new Date(outpass.leavingDate).toLocaleDateString()}</p>
    //         <p><strong>Returning Date:</strong> {new Date(outpass.returningDate).toLocaleDateString()}</p>
    //         <p><strong>Status:</strong> {outpass.status}</p>
    //         <div className="mt-4">
    //           <button 
    //             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
    //             // onClick={() => handleStatusChange(outpass._id, 'approved')}
    //             //cody
    //             onClick={() => handleApprove(outpass._id)}
    //           >
    //             Approve
    //           </button>
    //           <button 
    //             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    //             // onClick={() => handleStatusChange(outpass._id, 'rejected')}
    //             //cody
    //             onClick={() => handleReject(outpass._id)}
    //           >
    //             Reject
    //           </button>
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>

    //cody
    <div>
    <h2>Pending Outpasses for {hostel} Hostel</h2>
    {outpasses.map((outpass) => (
      <div key={outpass._id}>
        <p>Name: {outpass.name}</p>
        <p>Hostel: {outpass.hostelName}</p>
        <p>Leaving: {outpass.leavingDate} {outpass.leavingTime}</p>
        <p>Returning: {outpass.returningDate} {outpass.returningTime}</p>
        <button onClick={() => handleApprove(outpass._id)}>Approve</button>
        <button onClick={() => handleReject(outpass._id)}>Reject</button>
      </div>
    ))}
  </div>
  );
};

export default WardenDashboard;


