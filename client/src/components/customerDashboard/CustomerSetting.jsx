import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";
import PasswordChangeModal from "../commonModals/PasswordChangeModal";

const CustomerSetting = () => {
  const { user, setUser } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);
      payload.append("displayPic", profilePic);

      const response = await api.put(`/user/edit-profile`, payload);

      setUser(response.data.data);
      sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));

      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
    setProfilePicPreview(null);
    setEditingProfile(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicPreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

  return (
    <div className="min-h-[70vh] bg-[#fff8f1] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2d1b10]">
            Profile Settings
          </h2>
          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center gap-1 bg-[#c2410c] text-white px-3 py-1.5 rounded-lg text-sm hover:opacity-90 transition"
            >
              <MdEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="bg-[#c2410c] text-white px-4 py-1.5 rounded-br-2xl text-sm border border-transparent hover:border-(--color-primary-content)"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelProfile}
                className="flex items-center gap-2  rounded-br-2xl bg-(--color-secondary) text-(--color-secondary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#e7d9c9] shadow">
              <img
                src={profilePicPreview || user.photo.url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {editingProfile && (
              <div
                className="absolute cursor-pointer bottom-0 right-0 border border-[#e7d9c9] p-1.5 rounded-full bg-white shadow"
                title="Change Photo"
              >
                <label htmlFor="profilePic" className="cursor-pointer">
                  <MdOutlineAddAPhoto className="text-lg text-[#c2410c]" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  id="profilePic"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 max-w-sm mx-auto mb-2">
          <div>
            <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleProfileChange}
              className={`w-full border ${
                editingProfile ? "border-[#c2410c]" : "border-[#e7d9c9]"
              } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-(--color-secondary)" : "border-transparent"}`}
              disabled={!editingProfile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleProfileChange}
              className={`w-full border ${
                editingProfile ? "border-[#c2410c]" : "border-[#e7d9c9]"
              } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleProfileChange}
              className={`w-full border ${
                editingProfile ? "border-[#c2410c]" : "border-[#e7d9c9]"
              } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-(--color-secondary)" : "border-transparent"}`}
              disabled={!editingProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSetting;