import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const userData = { email, password };

    axios.post('http://localhost:7777/api/user/login', userData)
      .then((response) => {
        // Handle successful response
        //const userID:Number=response.data.data.id;
        const {role} = response.data.data;
        const { token} = response.data;
        console.log(role);
        console.log(token);
        
        localStorage.setItem("token", token);
        localStorage.setItem("Role", role);
        const {id} =response.data.data;
        localStorage.setItem("userId", JSON.stringify(id));

        window.location.href = '/dashboard'; // Redirect to DepartmentView page
      })
      .catch((error) => {
        // Handle error response
        setError(error.message);
      });
  };

  return (
    <div className='bg-slate-600 h-screen w-screen p-40 flex justify-center items-center'>
      <div className="container p-8 md:p-16 w-2/5 bg-gray-200 rounded-2xl text-gray-600 shadow-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="px-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="abebemola@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
              type="submit"
            >
              Login
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-2 text-center">
              {error}
            </p>
          )}
          <p className="text-sm text-gray-600 mt-2 text-center">
            Forgot password? <a href="/forgetpassword" className="text-blue-500 hover:text-blue-700">Reset password</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;