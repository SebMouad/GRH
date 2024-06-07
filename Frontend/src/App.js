import React, { useState, useEffect } from 'react';
import api from './api';
import LoginForm from './components/LoginForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveList from './components/LeaveList';
import Footer from './Footer';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('There was an error fetching the employees!', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const refreshEmployeeList = () => {
    // Implement logic to refresh the employee list if needed
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }


  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/delete/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('There was an error deleting the employee!', error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = (updatedEmployee) => {
    setEmployees(employees.map(employee => 
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    setEditingEmployee(null);
    fetchEmployees(); // Refresh the employee list
  };

  const handleAdd = () => {
    fetchEmployees(); // Refresh the employee list
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bonjour, {user.name}</h1>
      <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          Déconnexion
        </button>
      {user.role === 'department_head' || user.role === 'admin' ? (
        <>
          <EmployeeForm employee={editingEmployee} onSave={handleSave} onAdd={handleAdd} />
          <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
          <LeaveList />
        </>
      ) : (
        <>
          <LeaveRequestForm />
          <LeaveList />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
