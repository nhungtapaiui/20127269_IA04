import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(user);

  useEffect(() => {
    if (user) return;
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/profile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user]);

  return (
    <div className="h-screen flex flex-col items-center pt-20 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-800">Profile</h2>
      {profileData ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-xl">
            <span className="text-blue-800 font-bold">Email:</span><br/>
            {profileData.email}
          </p>
          <p className="text-center text-xl">
            <span className="text-blue-800 font-bold">Username:</span><br/>
            {profileData.username}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
