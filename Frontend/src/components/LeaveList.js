import React, { useEffect, useState } from 'react';
import api from '../api';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get('/leaves');
      setLeaves(response.data);
    } catch (error) {
      console.error('There was an error fetching the leave requests!', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.put('/leaves/update-status', { id, status });
      if (response.status === 200) {
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status } : leave));
      } else {
        console.error('Failed to update the leave status');
      }
    } catch (error) {
      console.error('There was an error updating the leave status!', error);
    }
  };

  return (
    <div className="p-4">
  <h2 className="text-2xl font-bold mb-4">Demandes de congé</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-3 text-left font-semibold">ID de l'employé</th>
          <th className="px-6 py-3 text-left font-semibold">Date de début</th>
          <th className="px-6 py-3 text-left font-semibold">Date de fin</th>
          <th className="px-6 py-3 text-left font-semibold">Statut</th>
          <th className="px-6 py-3 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map(leave => (
          <tr key={leave.id} className="border-b border-gray-200">
            <td className="px-6 py-4">{leave.employee_id}</td>
            <td className="px-6 py-4">{leave.start_date}</td>
            <td className="px-6 py-4">{leave.end_date}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 rounded bg-gray-300">{leave.status}</span>
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleStatusChange(leave.id, 'approved')}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Approuver
              </button>
              <button
                onClick={() => handleStatusChange(leave.id, 'rejected')}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
              >
                Refuser
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default LeaveList;
