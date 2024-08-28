import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from location state

  const handleInputChange = (index: any) => (event: any) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '') {
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:7777/api/user/otpverify', { email, otp: otp.join('') });
      if (response.data.success) {
        alert('OTP verified successfully!');
        // Redirect to the new password page
        navigate('/newpassword', { state: { email, otp: otp.join('') } });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred while verifying the OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className='bg-slate-600 h-screen w-screen p-40 flex justify-center items-center'>
  <div className="container p-12 md:p-20 w-2/5 bg-gray-200 rounded-2xl text-gray-600 shadow-2xl px-10 py-8" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-3xl font-bold mb-8">OTP Confirmation</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={handleInputChange(index)}
                className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 mr-2"
                maxLength={1}
                required
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Didn't receive the OTP? <a href="/resend-otp" className="text-blue-500 hover:text-blue-700">Resend OTP</a>
        </p>
      </div>
    </div>
  );
};

export default OTPConfirmation;