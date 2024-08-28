// import { useState } from "react";
// import loginImage from "../../public/Mobile login-cuate.svg"; // Replace with your actual image path
// import axios from "../utils/axios"; // Import axios for making API calls

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State to handle errors
//   const [loading, setLoading] = useState(false); // State to handle loading

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true before making the API call

//     try {
//       const response = await axios.post("api/user/login", {
//         email,
//         password,
//       });

//       // Handle the successful login response
//       console.log("Login successful:", response.data);
//       console.log(response.data);
//       setLoading(false);
//       if (response.status === 200) {
//         const { token, user } = response.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         console.error(response.data.message);
//       }
//       window.location.href = "/profile";
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       // Handle errors
//       if (error.response && error.response.data) {
//         setError(error.response.data.message);
//       } else {
//         setError("An error occurred while logging in. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-black">
//       <div className="flex flex-wrap md:flex-row w-full max-w-6xl p-16 mx-auto overflow-hidden rounded-lg shadow-lg  text-white">
//         <div className="md:w-1/2 p-8 md:p-12">
//           <div className="mb-8 text-center">
//             <h1 className="my-3 text-4xl font-bold text-green-700">Login</h1>
//             <p className="text-sm text-gray-300">
//               Login to access your account
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-400 text-left"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="example@gmail.com"
//                   className="w-full px-4 py-3 rounded-md border border-gray-300 bg-black text-gray-100 focus:border-green-600"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <div className="flex justify-between mb-2">
//                   <label htmlFor="password" className="text-gray-400">
//                     Password
//                   </label>
//                   <a
//                     href="/forgetPassword"
//                     className="text-xs text-gray-400 hover:underline"
//                   >
//                     Forget password?
//                   </a>
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="******************"
//                   className="w-full px-4 py-3 rounded-md border border-gray-300 bg-black text-gray-100 focus:border-green-600"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             {error && (
//               <p className="text-red-500 text-sm">{error}</p> // Display error message
//             )}
//             <div className="space-y-2">
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full px-8 py-3 font-semibold rounded-md bg-green-700 hover:bg-green-800 text-gray-300"
//                   disabled={loading} // Disable the button while loading
//                 >
//                   {loading ? "Logging in..." : "LOGIN"}
//                 </button>
//               </div>
//               <p className="text-sm text-gray-400">
//                 Do not have an account yet?
//                 <a
//                   href="/signup"
//                   className="ml-1 text-green-700 hover:underline"
//                 >
//                   Sign Up
//                 </a>
//                 .
//               </p>
//             </div>
//           </form>
//         </div>
//         <div className="md:w-1/2 relative">
//           <img
//             src={loginImage}
//             alt="Login"
//             className="absolute inset-0 w-full h-full object-cover image-darken"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;