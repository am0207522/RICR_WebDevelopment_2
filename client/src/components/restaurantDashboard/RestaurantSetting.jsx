// import React, { useState, useEffect } from "react";
// import { MdEdit } from "react-icons/md";
// import { MdOutlineLockReset } from "react-icons/md";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../config/api.config";
// import toast from "react-hot-toast";
// import { MdOutlineAddAPhoto } from "react-icons/md";
// import PasswordChangeModal from "../commonModals/PasswordChangeModal";

// const RestaurantSetting = () => {
//   const { user, setUser } = useAuth();
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profilePic, setProfilePic] = useState(null);
//   const [profilePicPreview, setProfilePicPreview] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
//     useState(false);

//   const [formData, setFormData] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//   });

//   const handleProfileChange = (e) => {
//     // Profile handlers
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setIsLoading(true);

//       const payload = new FormData();
//       payload.append("fullName", formData.fullName);
//       payload.append("email", formData.email.toLowerCase());
//       payload.append("phone", formData.phone);
//       payload.append("displayPic", profilePic);

//       const response = await api.put(`/user/edit-profile`, payload);

//       setUser(response.data.data);
//       sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));

//       setEditingProfile(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancelProfile = () => {
//     setFormData({
//       fullName: user.fullName,
//       email: user.email,
//       phone: user.phone,
//     });
//     setProfilePicPreview(null);
//     setEditingProfile(false);
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePicPreview(URL.createObjectURL(file));
//     setProfilePic(file);
//   };

//   return (
//     <>
//       <div className="min-h-[70vh] bg-[#fff8f1] flex items-center justify-center px-4 py-10">
//         <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-[#2d1b10]">
//               Profile Information
//             </h2>
//             {!editingProfile ? (
//               <button
//                 onClick={() => setEditingProfile(true)}
//                 className="flex items-center gap-1 bg-[#c2410c] text-white px-3 py-1.5 rounded-lg text-sm hover:opacity-90 transition"
//               >
//                 <MdEdit /> Edit
//               </button>
//             ) : (
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleSaveProfile}
//                   className="bg-[#c2410c] text-white px-4 py-1.5 rounded-br-2xl text-sm border border-transparent hover:border-(--color-primary-content)"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   onClick={handleCancelProfile}
//                   className="flex items-center gap-2  rounded-br-2xl bg-(--color-secondary) text-(--color-secondary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded text-sm"
//                   disabled={isLoading}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#e7d9c9] shadow">
//                 <img
//                   src={profilePicPreview || user.photo.url}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {editingProfile && (
//                 <div
//                   className="absolute cursor-pointer bottom-0 right-0 border border-[#e7d9c9] p-1.5 rounded-full bg-white shadow"
//                   title="Change Photo"
//                 >
//                   <label htmlFor="profilePic" className="cursor-pointer">
//                     <MdOutlineAddAPhoto className="text-lg text-[#c2410c]" />
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     name="profilePic"
//                     id="profilePic"
//                     className="hidden"
//                     onChange={handleProfilePicChange}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="grid gap-4 max-w-sm mx-auto mb-2">
//             <div>
//               <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleProfileChange}
//                 className={`w-full border ${
//                   editingProfile ? "border-[#c2410c]" : "border-[#e7d9c9]"
//                 } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-(--color-secondary)" : "border-transparent"}`}
//                 disabled={!editingProfile}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleProfileChange}
//                 className={`w-full border ${
//                   editingProfile ? "border-[#c2410c]" : "border-[#e7d9c9]"
//                 } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 disabled
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-[#2d1b10] mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleProfileChange}
//                 className={`w-full border ${
//                   editingProfile ? "border-[#c2410c]" : "border-[#e7d9c9]"
//                 } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-(--color-secondary)" : "border-transparent"}`}
//                 disabled={!editingProfile}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {isPasswordChangeModalOpen && (
//         <PasswordChangeModal
//           open={isPasswordChangeModalOpen}
//           onClose={() => setIsPasswordChangeModalOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default RestaurantSetting;

import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdOutlineLockReset } from "react-icons/md";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config";
import toast from "react-hot-toast";
import PasswordChangeModal from "../commonModals/PasswordChangeModal";

const RestaurantSetting = () => {
  const { user, setUser } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleProfileChange = (e) => {
    // Profile handlers
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
      sessionStorage.setItem(
        "cravingUser",
        JSON.stringify(response.data.data)
      );

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
    <>
      <div className="overflow-y-auto h-full p-6 space-y-6">
        {/* User Profile Section */}
        <div className="bg-(--color-base-200) rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Profile Information</h3>

            {!editingProfile ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingProfile(true)}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                >
                  <MdEdit /> Edit
                </button>

                <button
                  onClick={() => setIsPasswordChangeModalOpen(true)}
                  className="flex items-center gap-2 border border-(--color-primary) text-(--color-primary) px-3 py-1 rounded text-sm hover:bg-(--color-primary) hover:text-(--color-primary-content)"
                >
                  <MdOutlineLockReset />
                  Change Password
                </button>
              </div>
            ) : (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={handleCancelProfile}
                  className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
                    <div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-36 h-36">
                  <img
                    src={profilePicPreview || user.photo.url}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-(--color-primary)"
                  />
                </div>

                {editingProfile && (
                  <div
                    className="absolute cursor-pointer bottom-1 right-1 border p-2 rounded-full w-fit bg-(--color-base-200)"
                    title="Change Photo"
                  >
                    <label htmlFor="profilePic" className="cursor-pointer">
                      <MdOutlineAddAPhoto className="text-xl" />
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

              <div className="space-y-4 w-full">
                <div className="grid grid-cols-5 gap-2 justify-center items-center">
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleProfileChange}
                    className={`w-full px-3 py-2 border ${
                      editingProfile
                        ? "border-(--color-secondary)"
                        : "border-transparent"
                    } rounded col-span-4`}
                    disabled={!editingProfile}
                  />

                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    className={`w-full px-3 py-2 border ${
                      editingProfile
                        ? "border-(--color-secondary) text-(--color-secondary) disabled:bg-(--color-secondary)/50 cursor-not-allowed"
                        : "border-transparent"
                    } rounded col-span-4`}
                    disabled
                  />

                  <label className="block text-sm font-semibold mb-2">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleProfileChange}
                    className={`w-full px-3 py-2 border ${
                      editingProfile
                        ? "border-(--color-secondary)"
                        : "border-transparent"
                    } rounded col-span-4`}
                    disabled={!editingProfile}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantSetting;