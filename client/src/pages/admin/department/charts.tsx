import React, { useState, useEffect } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/Footer';
import Theme from '../../../components/theme';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { PieChart ,pieArcLabelClasses} from '@mui/x-charts/PieChart';

interface Employee {
  id: number;
  userId: number;
  deptId: number;
  jobTitle: string;
  gender: string;
  imageUrl: string;
  department: {
    name: string;
  };
}

interface ApiOutput {
  success: boolean;
  message: string;
  employees: Employee[];
}

const apiEndpoint = 'http://localhost:7777/api/employee/getAll';

function BarChartUserAnalysis() {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [jobTitleData, setJobTitleData] = useState<{ label: string; value: number }[]>([]);
  const [departmentData, setDepartmentData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(response => response.json())
      .then((data: ApiOutput) => {
        const employeeData = data.employees.reduce((acc, current) => {
          if (current.gender === 'MALE') {
            acc.male++;
          } else if (current.gender === 'FEMALE') {
            acc.female++;
          }
          return acc;
        }, { male: 0, female: 0 });

        const totalEmployees = data.employees.length;

        setChartData([
          {
            name: 'Male',
            value: employeeData.male,
          },
          {
            name: 'Female',
            value: employeeData.female,
          },
          {
            name: 'Total',
            value: totalEmployees,
          },
        ]);

        const jobTitleCounts = data.employees.reduce((acc, current) => {
          acc[current.jobTitle] = (acc[current.jobTitle] || 0) + 1;
          return acc;
        }, {});

        setJobTitleData(Object.keys(jobTitleCounts).map(key => ({ label: key, value: jobTitleCounts[key] })));

        const departmentCounts = data.employees.reduce((acc, current) => {
          acc[current.department.name] = (acc[current.department.name] || 0) + 1;
          return acc;
        }, {});

        setDepartmentData(Object.keys(departmentCounts).map(key => ({ label: key, value: departmentCounts[key] })));

        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Theme>
        <Header />
        <div className="w-full md:w-[40%] mb-2 p-8" style={{fontFamily: 'Arial, sans-serif'}}>
        <h2 className="text-2xl font-bold text-gray-800">Employee Analysis</h2>
        <div className="bg-white p-6 rounded-lg shadow-md"style={{ display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3cac6c" barSize={40} radius={[8, 8, 0, 0]}>
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mb-2">
      <div className="flex flex-wrap  mb-6"style={{fontFamily: 'Arial, sans-serif'}}>
      <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
  <h2 className="text-2xl font-bold  text-gray-800 pl-10">Job Title Distribution</h2>
  <div className="pl-10"style={{ height: 500, width: 500 }}>
  <PieChart
    series={[
      {
        arcLabel: (item) => `${item.label} (${item.value})`,
        arcLabelMinAngle: 45,
        data: jobTitleData,
      },
    ]}
    cx={150}
    cy={125}
    sx={{
      [`& .${pieArcLabelClasses.root}`]: {
        fill: 'white',
        fontWeight: 'bold',
      },
    }}
  />
</div>
  </div>
  
  <div style={  { display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
  <h2 className="text-2xl font-bold  text-gray-800 pl-10">Department Distribution</h2>
    <div className="pl-10"style={{ height: 500, width: 500 }}>
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data: departmentData,
        },
      ]}
      cx={150}
      cy={125}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      size={{
        width: 300,
        height: 250,
      }}
      palette={['#ff69b4', '#33b5e5', '#ffd700', '#009688', '#9c27b0']}
    /></div>
    </div>
  </div>
  
  </div>
  <Footer />
    </Theme>
  );
}

export default BarChartUserAnalysis;