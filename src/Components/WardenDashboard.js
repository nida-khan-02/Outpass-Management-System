import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./WardenDashboard.css"; // Import the CSS file

function WardenDashboard() {
  const [outpasses, setOutpasses] = useState([]);
  const [wardenHostel, setWardenHostel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWardenInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/warden/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Warden info response:", response.data);

        if (response.data && response.data.hostelName) {
          setWardenHostel(response.data.hostelName);
        } else {
          console.error("Hostel name not found in response");
        }
      } catch (error) {
        console.error("Error fetching warden info:", error);
      }
    };

    fetchWardenInfo();
  }, []); // The empty array ensures this effect runs only once, when the component mounts

  useEffect(() => {
    if (wardenHostel) {
      fetchOutpasses();
    }
  }, [wardenHostel]);

  // Fetch outpasses on component mount
  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/outpasses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOutpasses(response.data);
        setWardenHostel(response.data[0]?.hostelName || "Unknown Hostel");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching outpasses:", err);
        setError("Failed to fetch outpasses");
        setLoading(false);
      }
    };

    fetchOutpasses();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/outpass/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update outpasses state after successful update
      setOutpasses((prevOutpasses) =>
        prevOutpasses.map((outpass) =>
          outpass._id === id ? { ...outpass, status } : outpass
        )
      );
    } catch (err) {
      console.error("Error updating outpass status:", err);
      alert("Failed to update outpass status");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Warden Dashboard</h1>
      <h2 className="text-xl mb-4">Outpasses for hostel: {wardenHostel}</h2>
      {outpasses.length === 0 ? (
        <p>No outpasses available for this hostel</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outpasses.map((outpass) => (
            <div key={outpass._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">{outpass.studentName}</h3>
              <p>Roll No: {outpass.rollNo}</p>
              <p>Hostel: {outpass.hostelName}</p>
              <p>Reason: {outpass.reason}</p>
              <p>
                From: {new Date(outpass.fromDate).toLocaleDateString("en-GB")}
              </p>
              <p>To: {new Date(outpass.toDate).toLocaleDateString("en-GB")}</p>
              <p>Status: {outpass.status}</p>
              <div className="mt-2">
                {outpass.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(outpass._id, "approved")
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(outpass._id, "rejected")
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WardenDashboard;
