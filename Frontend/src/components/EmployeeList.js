import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="p-4">
  <h2 className="text-2xl font-bold mb-4">Employee List</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-3 text-left font-semibold">ID</th>
          <th className="px-6 py-3 text-left font-semibold">Nom & Prénom</th>
          <th className="px-6 py-3 text-left font-semibold">Email</th>
          <th className="px-6 py-3 text-left font-semibold">Département</th>
          <th className="px-6 py-3 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id} className="border-b border-gray-200">
            <td className="px-6 py-4">{employee.id}</td>
            <td className="px-6 py-4">{employee.name}</td>
            <td className="px-6 py-4">{employee.email}</td>
            <td className="px-6 py-4">{employee.department}</td>
            <td className="px-6 py-4">
              <button onClick={() => onEdit(employee)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Modifier</button>
              <button onClick={() => onDelete(employee.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default EmployeeList;
