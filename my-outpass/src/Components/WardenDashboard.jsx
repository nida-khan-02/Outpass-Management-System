import React, { useState, useEffect } from "react";
import api from "../api";
import { Calendar, Clock, User, Home, Check, X, AlertTriangle, Filter } from "lucide-react";

const WardenDashboard = ({ hostel }) => {
  const [outpasses, setOutpasses] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  useEffect(() => {
    if (hostel) {
      fetchOutpasses();
    }
  }, [hostel, filter]);

  const fetchOutpasses = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/outpasses?status=${filter}`);
      const filteredOutpasses = response.data.filter(outpass => outpass.hostelName === hostel);
      setOutpasses(filteredOutpasses);
    } catch (error) {
      console.error("Error fetching outpasses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`https://outpass-management-system-backend.vercel.app/api/outpass/${id}`, { status: "approved" });
      fetchOutpasses();
    } catch (error) {
      console.error("Error approving outpass:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`https://outpass-management-system-backend.vercel.app/api/outpass/${id}`, { status: "rejected" });
      fetchOutpasses();
    } catch (error) {
      console.error("Error rejecting outpass:", error);
    }
  };

  const handleRemove = (id) => {
    setOutpasses(outpasses.filter((outpass) => outpass._id !== id));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "text-green-600";
      case "rejected": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">Warden Dashboard</h2>
      </header>

      <main className="flex-grow p-4">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2"
          >
            <Filter className="w-5 h-5" />
          </button>
          <p className="text-sm font-semibold text-gray-600">
            Total: {outpasses.length}
          </p>
        </div>

        {isFilterOpen && (
          <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleFilterChange("pending")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Pending
            </button>
            <button
              onClick={() => handleFilterChange("approved")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === "approved" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Approved
            </button>
            <button
              onClick={() => handleFilterChange("rejected")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === "rejected" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Rejected
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : outpasses.length === 0 ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
            <p className="font-bold">No outpass requests</p>
            <p>There are currently no {filter} outpass requests to display.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {outpasses.map((outpass) => (
              <div key={outpass._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{outpass.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(outpass.status)}`}>
                      {outpass.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center"><Home className="w-4 h-4 mr-2" /> {outpass.hostelName}</p>
                    <p className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Leaving: {new Date(outpass.leavingDate).toLocaleDateString()}</p>
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {formatTime(outpass.leavingTime)}</p>
                    <p className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Returning: {new Date(outpass.returningDate).toLocaleDateString()}</p>
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {formatTime(outpass.returningTime)}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4">
                  {outpass.status === "pending" && (
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleApprove(outpass._id)}
                        className="flex-1 mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 mr-2" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(outpass._id)}
                        className="flex-1 ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
                      >
                        <X className="w-4 h-4 mr-2" /> Reject
                      </button>
                    </div>
                  )}
                  {outpass.status !== "pending" && (
                    <button
                      onClick={() => handleRemove(outpass._id)}
                      className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" /> Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WardenDashboard;