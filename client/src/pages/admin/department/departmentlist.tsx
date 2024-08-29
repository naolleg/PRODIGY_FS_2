import React, { useState, useEffect } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/Footer';
import Theme from '../../../components/theme';
import axios from 'axios';

const DepartmentView = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7777/api/department/getAll')
      .then((response) => {
        setDepartments(response.data.department);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:7777/api/department/delete/${id}`)
      .then((response) => {
        setDepartments(departments.filter((department) => department.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (id: number) => {
    window.location.href = `/department/edit/${id}`;
  };

  return (
    <Theme>
      <div className="flex flex-col h-screen" style={{ fontFamily: 'Arial, sans-serif' }}>
        <Header />
        <div className="flex-1 p-16">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-600">Departments</h1>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow"
                onClick={() => window.location.href = '/department/new'}
              >
                Add Department
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full shadow-md rounded border border-gray-100 pl-16">
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-800">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Type</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Manager</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {departments.map((department) => (
                  <tr key={department.id} className="hover:bg-gray-100">
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{department.id}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{department.name}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{department.type}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{department.manager.user.firstName} {department.manager.user.lastName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mr-2"
                          onClick={() => handleEdit(department.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
                          onClick={() => handleDelete(department.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </Theme>
  );
};

export default DepartmentView;