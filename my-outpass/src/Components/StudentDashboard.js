// import React, { useState } from 'react';
// import OutpassForm from './OutpassForm';
// import OutpassList from './OutpassList';

// function StudentDashboard() {
//   const [view, setView] = useState('default');

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
//       <div className="mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           onClick={() => setView('apply')}
//         >
//           Apply for Outpass
//         </button>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => setView('view')}
//         >
//           View Outpasses
//         </button>
//       </div>
//       {view === 'apply' && <OutpassForm />}
//       {view === 'view' && <OutpassList />}
//     </div>
//   );
// }

// export default StudentDashboard;



// import React, { useState } from 'react';
// import OutpassForm from './OutpassForm';
// import OutpassList from './OutpassList';

// const StudentDashboard = () => {
//   const [view, setView] = useState('default');

//   const handleOutpassSubmit = (formData) => {
//     // Logic to send formData to the backend via an API call
//     console.log('Form submitted:', formData);
//     // You might want to reset the view or show a success message here
//     // For example:
//     setView('view');
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
//       <div className="mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           onClick={() => setView('apply')}
//         >
//           Apply for Outpass
//         </button>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => setView('view')}
//         >
//           View Outpasses
//         </button>
//       </div>
//       {view === 'apply' && <OutpassForm onSubmit={handleOutpassSubmit} />}
//       {view === 'view' && <OutpassList />}
//     </div>
//   );
// };

// export default StudentDashboard;






//new code
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import OutpassForm from './OutpassForm';
import api from '../api/axios';

const StudentDashboard = () => {
  const [outpasses, setOutpasses] = useState([]);

  //cody
  // const [showOutpasses, setShowOutpasses] = useState(false);


  const handleOutpassSubmit = (newOutpass) => {
    setOutpasses([...outpasses, newOutpass]);
  };

  useEffect(() => {
    // const fetchOutpasses = async () => {
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/outpasses`);
    //     setOutpasses(response.data);
    //   } catch (error) {
    //     console.error('Error fetching outpasses:', error);
    //   }
    // };
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

    //cody
    // const fetchOutpasses = async () => {
    //   try {
    //     const response = await api.get('/api/outpasses');
    //     setOutpasses(response.data);
    //   } catch (error) {
    //     console.error('Error fetching outpasses:', error);
    //   }
    // };
    

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

// app.get('/api/outpasses', outpassController.getOutpasses);

// const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/outpass`, formData);
