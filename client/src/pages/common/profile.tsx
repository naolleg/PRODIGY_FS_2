import { useState, useEffect } from "react";
import profileImg from "../../assets/image.png";
import { faUser, faPhone, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import Theme from "../../components/theme";
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("HJBKJLK");
        
        const token = localStorage.getItem("token");
        console.log(token);
        
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }
        
        
        const userId = localStorage.getItem("userId");
        console.log(userId);
        console.log({
          headers: {
            Authorization: `${token}`,
          },
        });
        
        // Set the default headers for all Axios requests
        const response = await axios.get(`http://localhost:7777/api/profile/getProfile/${userId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const userData = response.data;
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Theme>
      <div className="flex flex-col min-h-screen">
        <Header />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="flex-grow flex items-center justify-center px-6">
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={profileImg||userData.employees[0].imageUrl}
                  alt="Profile"
                  className="w-20 h-20 object-cover rounded-full mb-4 border-2 border-blue-500"
                />
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                  {userData.firstName} {userData.lastName}
                </h1>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <UserInfo label="First Name:" value={userData.firstName} icon={faUser} />
                <UserInfo label="Last Name:" value={userData.lastName} icon={faUser} />
                <UserInfo label="Email:" value={userData.email} icon={faInbox} />
                <UserInfo label="Job Title:" value={userData.employees[0].jobTitle} icon={faUser} />
                <UserInfo label="Gender:" value={userData.employees[0].gender} icon={faUser} />
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </Theme>
  );
};

const UserInfo = ({ label, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4">
      <FontAwesomeIcon icon={icon} className="w-5 h-5 text-gray-600" />
      <div className="flex-grow flex justify-between">
        <p className="text-lg font-semibold text-gray-600">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
};

export default Profile;