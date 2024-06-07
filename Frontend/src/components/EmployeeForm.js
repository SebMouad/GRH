import React, { useState, useEffect } from 'react';
import api from '../api';

const initialFormData = {
  id: '',
  name: '',
  email: '',
  department: '',
  role: 'employee',
  password: '',
  leave_balance: 20,
};

const EmployeeForm = ({ employee = {}, onSave, onAdd }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (employee && Object.keys(employee).length > 0) {
      setFormData({
        id: employee.id || '',
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || '',
        role: employee.role || 'employee',
        password: '',
        leave_balance: employee.leave_balance || 20,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      try {
        await api.put('/employees/update', formData);
        onSave(formData);
      } catch (error) {
        console.error('There was an error updating the employee!', error);
      }
    } else {
      try {
        const response = await api.post('/employees/add', formData);
        onAdd(response.data);
        alert('Employee added successfully!');
        setFormData(initialFormData);
      } catch (error) {
        console.error('There was an error adding the employee!', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">{formData.id ? 'Edit Employee' : 'Add Employee'}</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required={!formData.id}
        />
        <input
          type="number"
          name="leave_balance"
          value={formData.leave_balance}
          onChange={handleChange}
          placeholder="Leave Balance"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {formData.id ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
