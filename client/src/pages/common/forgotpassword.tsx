import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordProps {
  // no props for now
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("'http://localhost:7777/api/user/reset-password'", { email });
      if (response.status === 200) {
        setSuccess("OTP sent to email!");
        setError("");
        // Navigate to OTP verification page with email as state
        navigate("/getOtp", { state: { email } });
      } else {
        setError("Error sending OTP. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error("An error occurred during password recovery:", err);
      setError("An error occurred. Please try again later.");
      setSuccess("");
    }
  };
  return (
    <div className='bg-slate-600 h-screen w-screen p-40 flex justify-center items-center'>
      <div className="container p-12 md:p-20 w-2/5 bg-gray-200 rounded-2xl text-gray-600 shadow-2xl px-10 py-8" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
        <form className="px-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Reset password link sent to your email!</div>}
          <button
            className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;