import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditDepartmentForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [managerId, setManagerId] = useState('');
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:7777/api/department/get/${id}`)
      .then(response => {
        setDepartment(response.data.department);
        setName(response.data.department.name);
        setType(response.data.department.type);
        setManagerId(response.data.department.managerId);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:7777/api/user/getAll')
      .then(response => {
        setManagers(response.data.users);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const userData = {
      name,
      type,
      managerId: parseInt(managerId)
    };
    axios.put(`http://localhost:7777/api/department/update/${id}`, userData)
      .then((response) => {
        setLoading(false);
        window.location.href = '/department'; // Redirect to DepartmentView page
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className='bg-slate-600 h-screen w-screen p-40 flex justify-center items-center'>
      <div className="container p-8 md:pb-8 w-2/5 bg-gray-200 rounded-2xl text-gray-600 shadow-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-3xl pl-8 pt-8 font-bold mb-4">Edit Department</h1>
        <form className="content-center px-16" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Department Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={department.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Department Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder={department.type}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manager">
              Manager
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="manager"
              value={managerId}
              onChange={e => setManagerId(e.target.value)}
            >
              <option value="">Select Manager</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>{manager.firstName} {manager.lastName}</option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Department'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentForm;