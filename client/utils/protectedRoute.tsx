import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const Role = localStorage.getItem("Role");
  if (!Role) {
    return <Navigate to="/" />;
  }
  
  console.log(Role);
  
  if (role === undefined) {
    throw new Error("Role prop is undefined");
  }
  console.log(role);
  
  if (Role !== role) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;