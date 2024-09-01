import React, { useState, useEffect } from "react";
import api from "../api";
// import User from '../../backend/models/User';

const WardenDashboard = ({ hostel }) => {
  const [outpasses, setOutpasses] = useState([]);

  useEffect(() => {
    fetchOutpasses();
    const interval = setInterval(fetchOutpasses, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [hostel]);

  const fetchOutpasses = async () => {
    try {
      const response = await api.get(
        `/api/outpasses?hostel=${hostel}&status=pending`
      );
      // Assuming the response now includes college_id
      console.log("Outpasses fetched:", response.data);
      setOutpasses(response.data);
    } catch (error) {
      console.error("Error fetching outpasses:", error);
    }
  };

  // const handleApprove = async (id) => {
  //   try {
  //     await api.put(`/api/outpass/${id}`, { status: 'approved' });
  //     fetchOutpasses();
  //   } catch (error) {
  //     console.error('Error approving outpass:', error);
  //   }
  // };
  const handleApprove = async (id) => {
    try {
      await api.put(`/api/outpass/${id}`, { status: "approved" });
      setOutpasses(
        outpasses.map((outpass) =>
          outpass._id === id ? { ...outpass, status: "approved" } : outpass
        )
      );
    } catch (error) {
      console.error("Error approving outpass:", error);
    }
  };

  // const handleReject = async (id) => {
  //   try {
  //     await api.put(`/api/outpass/${id}`, { status: 'rejected' });
  //     fetchOutpasses();
  //   } catch (error) {
  //     console.error('Error rejecting outpass:', error);
  //   }
  // };
  const handleReject = async (id) => {
    try {
      await api.put(`/api/outpass/${id}`, { status: "rejected" });
      setOutpasses(
        outpasses.map((outpass) =>
          outpass._id === id ? { ...outpass, status: "rejected" } : outpass
        )
      );
    } catch (error) {
      console.error("Error rejecting outpass:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Not specified";
    const date = new Date(dateTimeString);
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Invalid Date";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-black">Warden Dashboard</h2>
      {outpasses.length === 0 ? (
        <p className="text-lg text-gray-600">No pending outpass requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outpasses.map((outpass) => (
            <div
              key={outpass._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Name: {outpass.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  Hostel: {outpass.hostelName}
                </p>
                <p className="text-gray-600 mb-1">
                  Leaving Date:{" "}
                  {new Date(outpass.leavingDate).toLocaleDateString()}
                </p>

                {/* <p className="text-gray-600 mb-1">Leaving Time: {new Date(outpass.leavingTime).toLocaleTimeString()}</p> */}
                <p className="text-gray-600 mb-1">
                  Leaving Time: {formatDateTime(outpass.leavingDate)}
                </p>

                <p className="text-gray-600 mb-1">
                  Returning Date:{" "}
                  {new Date(outpass.returningDate).toLocaleDateString()}
                </p>
                {/* <p className="text-gray-600 mb-1">Returning Time: {new Date(outpass.returningTime).toLocaleTimeString()}</p> */}
                <p className="text-gray-600 mb-1">
                  Returning Time: {formatDateTime(outpass.returningDate)}
                </p>

                <p className="text-gray-700 mb-4">{outpass.reason}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleApprove(outpass._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${outpass.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={outpass.status === 'approved'}"
                >
                  {outpass.status === "approved" ? "Approved" : "Approve"}

                  {/* Approve */}
                </button>
                <button
                  onClick={() => handleReject(outpass._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${outpass.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={outpass.status === 'rejected'}"
                >
                  {outpass.status === "rejected" ? "Rejected" : "Reject"}

                  {/* Reject */}
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
