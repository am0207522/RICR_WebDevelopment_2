import React, { useState, useEffect } from "react";
import { MdEdit, MdOutlineAddAPhoto } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config";
import toast from "react-hot-toast";

const Settings = () => {
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

  // Profile handlers
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
        {/* Heading + Edit button row */}
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

        {/* Profile photo */}
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

        {/* Form fields */}
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
              disabled
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
              disabled={!editingProfile}
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
              } rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
              disabled={!editingProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// import React, { useState, useEffect } from "react";
// import { MdEdit } from "react-icons/md";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../config/api.config";
// import toast from "react-hot-toast";
// import { MdOutlineAddAPhoto } from "react-icons/md";

// const CustomerSetting = () => {
//   const { user, setUser } = useAuth();

//   // User Profile States
//   const [profileData, setProfileData] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     photo: user?.photo || "https://via.placeholder.com/150",
//   });

//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profilePicPreview, setProfilePicPreview] = useState(null);

//   const [formData, setFormData] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//   });
//   const [isSavingProfile, setIsSavingProfile] = useState(false);

//   // Update profileData when user changes
//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         fullName: user.fullName || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         photo: user.photo || "https://via.placeholder.com/150",
//       });
//       setFormData({
//         fullName: user.fullName || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//     }
//   }, [user?.fullName, user?.email, user?.phone, user?.photo]);

//   // Profile handlers
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setIsSavingProfile(true);

//       const response = await api.put(`/user/edit-profile`, {
//         fullName: formData.fullName,
//         email: formData.email.toLowerCase(),
//         phone: formData.phone,
//       });

//       const updatedUser = response.data.data;
//       setProfileData({
//         fullName: updatedUser.fullName || "",
//         email: updatedUser.email || "",
//         phone: updatedUser.phone || "",
//         photo: updatedUser.photo || "https://via.placeholder.com/150",
//       });

//       setUser(updatedUser);
//       sessionStorage.setItem("cravingUser", JSON.stringify(updatedUser));

//       setEditingProfile(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setIsSavingProfile(false);
//     }
//   };

//   const handleCancelProfile = () => {
//     setFormData({
//       fullName: profileData.fullName,
//       email: profileData.email,
//       phone: profileData.phone,
//     });
//     setEditingProfile(false);
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     const fileURL = URL.createObjectURL(file);

//     setProfilePicPreview(fileURL);
//     setProfilePic(file);
//   };

//   return (
//     <div className="overflow-y-auto h-full p-6 space-y-6">
//       {/* User Profile Section */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-[#2d1b10]">
//             Profile Information
//           </h3>
//           {!editingProfile ? (
//             <button
//               onClick={() => setEditingProfile(true)}
//               className="flex items-center gap-2 bg-[#c2410c] text-white px-3 py-1 rounded-lg text-sm hover:opacity-90 transition"
//             >
//               <MdEdit /> Edit
//             </button>
//           ) : (
//             <div className="flex gap-2 justify-end">
//               <button
//                 onClick={handleSaveProfile}
//                 className="flex items-center gap-2 bg-[#c2410c] text-white px-3 py-1 rounded-lg text-sm hover:opacity-90 transition"
//                 disabled={isSavingProfile}
//               >
//                 {isSavingProfile ? "Saving..." : "Save Changes"}
//               </button>
//               <button
//                 onClick={handleCancelProfile}
//                 className="flex items-center gap-2 border border-[#c2410c] text-[#c2410c] px-3 py-1 rounded-lg text-sm hover:bg-[#c2410c] hover:text-white transition"
//                 disabled={isSavingProfile}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         <div>
//           <div className="flex items-center gap-6">
//             <div className="relative">
//               <div className="w-36 h-36">
//                 <img
//                   src={profilePicPreview || profileData.photo}
//                   alt="Profile"
//                   className="w-full h-full rounded-full object-cover ring-4 ring-[#e7d9c9] shadow"
//                 />
//               </div>

//               <div
//                 className="absolute cursor-pointer bottom-1 right-1 border border-[#e7d9c9] p-2 rounded-full w-fit bg-white shadow"
//                 title="Change Photo"
//               >
//                 <label htmlFor="profilePic" className="cursor-pointer">
//                   <MdOutlineAddAPhoto className="text-xl text-[#c2410c]" />
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   name="profilePic"
//                   id="profilePic"
//                   className="hidden"
//                   onChange={handleProfilePicChange}
//                 />
//               </div>
//             </div>

//             <div className="space-y-4 w-full">
//               <div className="grid grid-cols-5 gap-2 justify-center items-center">
//                 <label className="block text-sm font-semibold text-[#2d1b10] mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleProfileChange}
//                   className={`w-full px-3 py-2 border ${
//                     editingProfile ? "border-[#c2410c]" : "border-transparent"
//                   } rounded-lg col-span-4 outline-none focus:border-[#c2410c] transition`}
//                   disabled={!editingProfile}
//                 />

//                 <label className="block text-sm font-semibold text-[#2d1b10] mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleProfileChange}
//                   className={`w-full px-3 py-2 border ${
//                     editingProfile ? "border-[#c2410c]" : "border-transparent"
//                   } rounded-lg col-span-4 outline-none focus:border-[#c2410c] transition`}
//                   disabled={!editingProfile}
//                 />

//                 <label className="block text-sm font-semibold text-[#2d1b10] mb-2">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleProfileChange}
//                   className={`w-full px-3 py-2 border ${
//                     editingProfile ? "border-[#c2410c]" : "border-transparent"
//                   } rounded-lg col-span-4 outline-none focus:border-[#c2410c] transition`}
//                   disabled={!editingProfile}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerSetting;
