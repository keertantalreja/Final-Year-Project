import React from "react";
import Profile from "../../../components/dynamic/profile/Profile";
import Navbar from "../../../components/dynamic/navbar/Navbar";
const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <Profile role="student" />
    </div>
  );
};

export default ProfilePage;
