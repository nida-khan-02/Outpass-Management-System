
// import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// import api from '../api/axios';

// const WardenDashboard = ({ hostel }) => {
//   const [outpasses, setOutpasses] = useState([]);

//   //cody
//   useEffect(() => {
//     fetchOutpasses();
//   }, [ hostel ]);

//   const fetchOutpasses = async () => {
//     try {
//       const response = await api.get(`/api/outpasses?hostel=${hostel}&status=pending`);
//       setOutpasses(response.data);
//     } catch (error) {
//       console.error('Error fetching outpasses:', error);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await api.put(`/api/outpass/${id}`, { status: 'rejected' });
//       fetchOutpasses();
//     } catch (error) {
//       console.error('Error rejecting outpass:', error);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await api.put(`/api/outpass/${id}`, { status: 'approved' });
//       fetchOutpasses();
//     } catch (error) {
//       console.error('Error approving outpass:', error);
//     }
//   };

//   return (
//     <div>
//     <h2>Pending Outpasses for {hostel} Hostel</h2>
//     {outpasses.map((outpass) => (
//       <div key={outpass._id}>
//         <p>Name: {outpass.name}</p>
//         <p>Hostel: {outpass.hostelName}</p>
//         <p>Leaving: {outpass.leavingDate} {outpass.leavingTime}</p>
//         <p>Returning: {outpass.returningDate} {outpass.returningTime}</p>
//         <button onClick={() => handleApprove(outpass._id)}>Approve</button>
//         <button onClick={() => handleReject(outpass._id)}>Reject</button>
//       </div>
//     ))}
//   </div>
//   );
// };

// export default WardenDashboard;




//cody 30-08-2024
// import React, { useState, useEffect } from 'react';
// import api from '../api';


// const WardenDashboard = ({ hostel }) => {
//   const [outpasses, setOutpasses] = useState([]);

//   useEffect(() => {
//     fetchOutpasses();
//     const interval = setInterval(fetchOutpasses, 30000); // Refresh every 30 seconds
//     return () => clearInterval(interval);
//   }, [hostel]);

//   const fetchOutpasses = async () => {
//     try {
//       const response = await api.get(`/api/outpasses?hostel=${hostel}&status=pending`);
//       setOutpasses(response.data);
//     } catch (error) {
//       console.error('Error fetching outpasses:', error);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await api.put(`/api/outpass/${id}`, { status: 'approved' });
//       fetchOutpasses();
//     } catch (error) {
//       console.error('Error approving outpass:', error);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await api.put(`/api/outpass/${id}`, { status: 'rejected' });
//       fetchOutpasses();
//     } catch (error) {
//       console.error('Error rejecting outpass:', error);
//     }
//   };
// //cody
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-indigo-700">Warden Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {outpasses.length === 0 ? (
//           <p className="text-lg text-gray-600">No pending outpass requests.</p>
//         ) : (
//           outpasses.map((outpass) => (
//             <div key={outpass._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
//               <h3 className="text-xl font-semibold mb-2 text-indigo-600">{outpass.studentName}</h3>
//               <p className="text-gray-600 mb-1">From: {new Date(outpass.fromDate).toLocaleDateString()}</p>
//               <p className="text-gray-600 mb-3">To: {new Date(outpass.toDate).toLocaleDateString()}</p>
//               <p className="text-gray-700 mb-4">{outpass.reason}</p>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => handleApprove(outpass._id)}
//                   className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleReject(outpass._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );



// };

// export default WardenDashboard;

//chatgpt for ui 30-08-2024
import React, { useState, useEffect } from 'react';
import api from '../api';

const WardenDashboard = ({ hostel }) => {
  const [outpasses, setOutpasses] = useState([]);

  useEffect(() => {
    fetchOutpasses();
    const interval = setInterval(fetchOutpasses, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [hostel]);

  const fetchOutpasses = async () => {
    try {
      const response = await api.get(`/api/outpasses?hostel=${hostel}&status=pending`);
      setOutpasses(response.data);
    } catch (error) {
      console.error('Error fetching outpasses:', error);
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

  const handleReject = async (id) => {
    try {
      await api.put(`/api/outpass/${id}`, { status: 'rejected' });
      fetchOutpasses();
    } catch (error) {
      console.error('Error rejecting outpass:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-indigo-700">Warden Dashboard</h2>
      {outpasses.length === 0 ? (
        <p className="text-lg text-gray-600">No pending outpass requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outpasses.map((outpass) => (
            <div key={outpass._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">{outpass.studentName}</h3>
                <p className="text-gray-600 mb-1">Roll No: {outpass.rollNo}</p>
                <p className="text-gray-600 mb-1">Hostel: {outpass.hostelName}</p>
                <p className="text-gray-600 mb-1">From: {new Date(outpass.fromDate).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-1">To: {new Date(outpass.toDate).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-4">{outpass.reason}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleApprove(outpass._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(outpass._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WardenDashboard;




