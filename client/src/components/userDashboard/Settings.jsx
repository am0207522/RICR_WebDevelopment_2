import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditable(false);

    const payLoad = {
      email: tempUser.email.toLowerCase(),
      fullName: tempUser.fullName,
      phone: tempUser.phone,
    };

    console.log(payLoad);

    try {
      const res = await api.put("/user/edit-profile", payLoad);
      setUser(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      // CHANGED: added optional chaining on error.response so this doesn't
      // crash with "Cannot read properties of undefined (reading 'status')"
      // when there's no server response (e.g. network/CORS error) — same
      // bug pattern we fixed earlier in Login.jsx.
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#fff8f1] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#2d1b10] mb-6 text-center">
          Profile Settings
        </h2>

        {/* Profile photo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#bbb8b5] shadow bg-[#0c0c0c] flex items-center justify-center">
            <img
              src="/myImage.jpg"
              alt="Profile Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Editable / view fields */}
        {isEditable === true ? (
          <div className="grid gap-4 max-w-sm mx-auto mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={tempUser.fullName}
                className="w-full border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={tempUser.email}
                className="w-full border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                value={tempUser.phone}
                className="w-full border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition"
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 max-w-sm mx-auto mb-6 text-center">
            <div className="text-lg font-semibold text-[#2d1b10]">
              {user.fullName}
            </div>
            <div className="text-gray-600">{user.email}</div>
            <div className="text-gray-600">{user.phone}</div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-3">
          {isEditable === true ? (
            <>
              <button
                onClick={() => setIsEditable(false)}
                className="border border-[#c2410c] text-[#c2410c] px-5 py-2 rounded-lg hover:bg-[#c2410c] hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#c2410c] text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditable(true)}
              className="bg-[#c2410c] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;