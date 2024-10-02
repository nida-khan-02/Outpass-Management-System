import React, { useState, useEffect } from "react";
import api from "../api";

const WardenDashboard = ({ hostel }) => {
  const [outpasses, setOutpasses] = useState([]);
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  useEffect(() => {
    if (hostel) {
      fetchOutpasses();
      const interval = setInterval(fetchOutpasses, 30000);
      return () => clearInterval(interval);
    }
  }, );

  const fetchOutpasses = async () => {
    try {
      const response = await api.get(`/api/outpasses?status=pending`);
      const filteredOutpasses = response.data.filter(outpass => outpass.hostelName === hostel);
      setOutpasses(filteredOutpasses);
    } catch (error) {
      console.error("Error fetching outpasses:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`https://outpass-management-system-backend.vercel.app/api/outpass/${id}`, { status: "approved" });
      setOutpasses(outpasses.map((outpass) =>
        outpass._id === id ? { ...outpass, status: "approved" } : outpass
      ));
    } catch (error) {
      console.error("Error approving outpass:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`https://outpass-management-system-backend.vercel.app/api/outpass/${id}`, { status: "rejected" });
      setOutpasses(outpasses.map((outpass) =>
        outpass._id === id ? { ...outpass, status: "rejected" } : outpass
      ));
    } catch (error) {
      console.error("Error rejecting outpass:", error);
    }
  };

  const handleRemove = (id) => {
    setOutpasses(outpasses.filter((outpass) => outpass._id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-black">Warden Dashboard</h2>
      {outpasses.length === 0 ? (
        <p className="text-lg text-gray-600">No pending outpass requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outpasses.map((outpass) => (
            <div key={outpass._id} className="bg-white rounded-lg shadow-lg p-6 relative">
              <button onClick={() => handleRemove(outpass._id)} className="absolute top-2 right-2">
                &times;
              </button>
              <div className="mb-4">
                <p><strong>Name:</strong> {outpass.name}</p>
                <p><strong>Hostel Name:</strong> {outpass.hostelName}</p>
                <p><strong>Leaving Date:</strong> {new Date(outpass.leavingDate).toLocaleDateString()}</p>
                <p><strong>Leaving Time:</strong> {formatTime(outpass.leavingTime)}</p>
                <p><strong>Returning Date:</strong> {new Date(outpass.returningDate).toLocaleDateString()}</p>
                <p><strong>Returning Time:</strong> {formatTime(outpass.returningTime)}</p>
              </div>
              <div className="flex justify-between">
              <button
                  onClick={() => handleApprove(outpass._id)}
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${
                    outpass.status === "approved"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={outpass.status === "approved"}
                >
                  {outpass.status === "approved" ? "Approved" : "Approve"}
                </button>
                <button
                  onClick={() => handleReject(outpass._id)}
                  className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${
                    outpass.status === "rejected"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={outpass.status === "rejected"}
                >
                  {outpass.status === "rejected" ? "Rejected" : "Reject"}
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
