import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/common/login';
import AdminDashboard from './pages/admin/adminDashboard';
import Register from './pages/admin/emploeeRegister';
import ForgotPassword from './pages/common/forgotpassword';
import DepartmentView from './pages/admin/department/departmentlist';
import NewDepartmentForm from './pages/admin/department/newdept';
import ProfilePage from './pages/common/profile';
import OTPConfirmation from './pages/common/otpverify';
import NewPassword from './pages/common/newpassword';
import EditDepartmentForm from './pages/admin/department/editdept';
import BarChartUserAnalysis from './pages/admin/department/charts';
import ProtectedRoute from '../utils/protectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
       {/* <Route path="/department/new" element={<NewDepartmentForm/>}/>*/}
     <Route path="/dashboard/newEmployee" element={
      <ProtectedRoute role='ADMIN'> <Register/>
      </ProtectedRoute>} />  
     <Route path="/dashboard"  element={ 
     <ProtectedRoute role='ADMIN'> <AdminDashboard />
     </ProtectedRoute>
  }/>
     <Route path="/" element={<Login />} />
    <Route path="/forgetPassword" element={<ForgotPassword />} />
    <Route path="/department" element={
      <ProtectedRoute role='ADMIN'> <DepartmentView/>
      </ProtectedRoute>}/>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/department/new" element={
      <ProtectedRoute role='ADMIN'> <NewDepartmentForm/>
      </ProtectedRoute>}/>
    <Route path="/department/edit/:id" element={
      <ProtectedRoute role='ADMIN'> <EditDepartmentForm />
      </ProtectedRoute>}/>
    <Route path="/getOtp" element={<OTPConfirmation />} /> 
     <Route path="/newPassword" element={<NewPassword />}/>
     <Route path="/analysis" element={
      <ProtectedRoute role='ADMIN'> <BarChartUserAnalysis/>
      </ProtectedRoute>}/>
      {/* <Route path="/department" element={<DepartmentView/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
