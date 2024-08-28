import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!email || !newPassword || !confirmPassword) {
      setError("Email and password are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put("http://localhost:7777/api/user/newpassword", {
        email,
        newpassword: newPassword,
      });
      if (response.status === 200) {
        navigate("/"); // Redirect to login page
      } else {
        setError(response.data.message || "Error updating password");
      }
    } catch (err) {
      console.error("An error occurred during password update:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='bg-slate-600 h-screen w-screen p-40 flex justify-center items-center'>
      <div className="container p-8 md:p-16 w-2/5 bg-gray-200 rounded-2xl text-gray-600 shadow-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-3xl font-bold mb-4">New Password</h1>
        <form className="px-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;