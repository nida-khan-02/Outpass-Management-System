import React, { useState } from 'react';
import api from '../api/api';

const OutpassForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    hostelName: '',
    leavingDate: '',
    leavingTime: '',
    returningDate: '',
    returningTime: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  

  const validateForm = () => {
    if (new Date(formData.returningDate) < new Date(formData.leavingDate)) {
      setMessage({ text: 'Returning date cannot be before leaving date', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await api.post('http://localhost:5000/api/outpass', formData);
      await api.post('http://localhost:5000/api/outpass', formData);
      if (response.status === 201) {
        setMessage({ text: 'Outpass submitted successfully!', type: 'success' });
        onSubmit(response.data);

        setFormData({
          name: '',
          hostelName: '',
          leavingDate: '',
          returningDate: '',
          leavingTime: '',
          returningTime: '',
        });
      }
    } catch (error) {
      console.error('Error submitting outpass:', error);
      setMessage({ 
        text: error.response?.data?.message || 'Failed to submit outpass. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">Apply for Outpass</h3>
      {message.text && (
        <div className={`mb-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="Name"
        />
      </div>

      {/* <div className="mb-4">
        <label htmlFor="college_id" className="block text-gray-700 text-sm font-bold mb-2">College id</label>
        <input
          id="college_id"
          type="text"
          name="College Id"
          value={formData.name}
          onChange={handleChange}
          placeholder='College Id'
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="College Id"
        />
      </div> */}

      <div className="mb-4">
        <label htmlFor="hostelName" className="block text-gray-700 text-sm font-bold mb-2">Hostel Name</label>
        <input
          id="hostelName"
          type="text"
          name="hostelName"
          value={formData.hostelName}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="Hostel Name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="leavingDate" className="block text-gray-700 text-sm font-bold mb-2">Leaving Date</label>
        <input
          id="leavingDate"
          type="date"
          name="leavingDate"
          value={formData.leavingDate}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="Leaving Date"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="leavingTime" className="block text-gray-700 text-sm font-bold mb-2">Leaving Time</label>
        <input
          id="leavingTime"
          type="time"
          name="leavingTime"
          value={formData.leavingTime}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="Leaving Time"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="returningDate" className="block text-gray-700 text-sm font-bold mb-2">Returning Date</label>
        <input
          id="returningDate"
          type="date"
          name="returningDate"
          value={formData.returningDate}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="Returning Date"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="returningTime" className="block text-gray-700 text-sm font-bold mb-2">Returning Time</label>
        <input
          id="returningTime"
          type="time"
          name="returningTime"
          value={formData.returningTime}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
          aria-label="Returning Time"
        />
      </div>

      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default OutpassForm;


