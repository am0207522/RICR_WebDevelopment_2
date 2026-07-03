import React from "react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  return (
    <>
      <div>Welcome Back!! {user.fullName}</div>
      <div>Welcome Back!! {user.email}</div>
      <div>Welcome Back!! {user.phone}</div>
      <div>Welcome Back!! {user.dateOfBirth}</div>

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        <img src={user.photo} alt="" className="w-full h-full object-cover" />
      </div>
    </>
  );
};

export default Settings;
