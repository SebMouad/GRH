import React, { useState } from 'react';
import api from '../api';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    employee_id: '', // Set this to the current user's ID
    start_date: '',
    end_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leaves/request', formData);
      alert('Leave request submitted successfully!');
      setFormData({
        employee_id: '', // Reset to the current user's ID if needed
        start_date: '',
        end_date: ''
      });
    } catch (error) {
      console.error('There was an error submitting the leave request!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">Demande de congé</h2>
      <div className="space-y-4">
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Soumettez
        </button>
      </div>
    </form>
  );
};

export default LeaveRequestForm;
