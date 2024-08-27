import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/common/login';
import AdminDashboard from './pages/admin/adminDashboard';
import Register from './pages/admin/emploeeRegister';
import ForgotPassword from './pages/common/forgotpassword';
import DepartmentView from './pages/admin/department/departmentlist';
import NewDepartmentForm from './pages/admin/department/newdept';
import ProfilePage from './pages/common/profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
       {/* <Route path="/department/new" element={<NewDepartmentForm/>}/>*/}
     <Route path="/dashboard/newEmployee" element={<Register/>} />  
     <Route path="/dashboard" element={<AdminDashboard />} />
     <Route path="/" element={<Login />} />
    <Route path="/forgetPassword" element={<ForgotPassword />} />
    <Route path="/department" element={<DepartmentView/>}/>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/department/new" element={<NewDepartmentForm/>}/>
     {/*  <Route path="/getOtp" element={<OTPConfirmation />} /> 
      <Route path="/newPassword" element={<NewPassword />}/>
      <Route path="/department" element={<DepartmentView/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
