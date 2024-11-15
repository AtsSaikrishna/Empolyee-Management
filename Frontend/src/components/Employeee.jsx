
import  { useState, useEffect } from 'react';
import axios from 'axios';

const Employeee = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', jobTitle: '' });
  
  const url = "http://localhost:8080/api/employees"

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  
  const addEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({ name: '', email: '', jobTitle: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await axios.put(`${url}/${id}`, updatedEmployee);
      setEmployees(employees.map(emp => (emp.id === id ? response.data : emp)));
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Employee Management</h1>
        
        
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newEmployee.jobTitle}
            onChange={(e) => setNewEmployee({ ...newEmployee, jobTitle: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={addEmployee}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Add Employee
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Employee List</h2>
        <ul className="space-y-4">
          {employees.map((employee) => (
            <li key={employee.id} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center space-x-4">
              <div className="w-full space-y-2">
                <input
                  type="text"
                  value={employee.name}
                  onChange={(e) => updateEmployee(employee.id, { ...employee, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="email"
                  value={employee.email}
                  onChange={(e) => updateEmployee(employee.id, { ...employee, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={employee.jobTitle}
                  onChange={(e) => updateEmployee(employee.id, { ...employee, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <button
                onClick={() => deleteEmployee(employee.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Employeee;
