import React, { useState } from 'react';
import api from '../api';
import Footer from '../Footer';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/employees'); // Fetch all employees
      const employees = response.data;

      // Check if there is an employee with the provided email and password
      const user = employees.find(emp => emp.email === email && emp.password === password);

      if (user) {
        onLogin(user);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Connexion
        </button>
      </div>
    </form>
    <Footer />
    </>
  );
};

export default LoginForm;
