import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import Theme from '../../components/theme';

function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7777/api/user/getAll')
      .then(response => response.json())
      .then(data => setData(data.users)); // extract the users array
  }, []);

  useEffect(() => {
    setFilteredData(data); // update filteredData with data when data changes
  }, [data]);

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredData:any = data.filter((item:any) => {
      return (
        item.firstName.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.employees.map((employee: any) => employee.department.name).join(', ').toLowerCase().includes(searchTerm) || // assuming departmentId is a number
        item.activeStatus.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(filteredData);
  };

  // Extract the relevant columns from the data
  const columns = [
    { header: 'Employee ID', accessor: 'id' },
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'departmentId' },
    { header: 'Status', accessor: 'activeStatus' },
  ];  

  return (
    <Theme>
      <div className="flex flex-col h-screen" style={{ fontFamily: 'Arial, sans-serif' }}>
        <Header />
        <div className="flex-1 p-4">
          <div className="flex justify-normal mb-4 justify-between">
            <h1 className="text-3xl font-bold mr-10 text-gray-600">Admin Dashboard</h1>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow "
              onClick={() => window.location.href = '/dashboard/newEmployee'}
            >
              Add employee
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full shadow-md rounded border border-gray-100 pl-16">
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-800">
                <tr>
                  {columns.map((column) => (
                    <th key={column.header} className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">{column.header}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
              {filteredData.length > 0 ? filteredData.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    {columns.map((column) => {
                      if (column.accessor === 'departmentId') {
                        return (
                          <td key={column.accessor} className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {item.employees.map((employee: any) => employee.department.name).join(', ')}
                            </div>
                          </td>
                        );
                      } else {
                        return (
                          <td key={column.accessor} className="p-2 whitespace-nowrap">
                            <div className="text-left">{item[column.accessor]}</div>
                          </td>
                        );
                      }
                    })}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </Theme>
  );
}

export default AdminDashboard;