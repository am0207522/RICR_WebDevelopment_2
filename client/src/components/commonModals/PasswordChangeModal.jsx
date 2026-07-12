// import React from "react";
// import { useState } from "react";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { LuLoaderCircle } from "react-icons/lu";
// import api from "../../config/api.config";
// import toast from "react-hot-toast";

// const PasswordChangeModal = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleCloseModal = () => {
//     setFormData({
//       oldPassword: "",
//       newPassword: "",
//       confirmNewPassword: "",
//     });
//     onClose();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleChangePassword = async () => {
//     setIsLoading(true);
//     try {
//       if (formData.newPassword !== formData.confirmNewPassword) {
//         toast.error("New password and confirm password do not match.");
//         setIsLoading(false);
//         return;
//       }
//       const res = await api.patch("/common/change-password", formData);
//       toast.success("Password changed successfully!");
//       handleCloseModal();
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Unknown error occurred during password change. Please try again.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!open) return null;
//   return (
//     <>
//       <div className="fixed inset-0 z-999 bg-black/60 backdrop-blur-xs flex justify-center items-center px-4">
//         <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto relative">
//           <header className="flex justify-between items-center p-4 border-b border-[#e7d9c9]">
//             <div className="font-bold text-xl text-[#c2410c]">
//               Change Password
//             </div>
//             <button onClick={handleCloseModal}>
//               <IoIosCloseCircleOutline className="text-red-400 hover:text-red-700 text-2xl transition" />
//             </button>
//           </header>

//           <main>
//             <div className="p-6 space-y-4">
//               <div className="flex flex-col gap-2">
//                 <label
//                   htmlFor="oldPassword"
//                   className="font-semibold text-sm text-[#2d1b10]"
//                 >
//                   Current Password
//                 </label>
//                 <input
//                   type="password"
//                   id="oldPassword"
//                   name="oldPassword"
//                   value={formData.oldPassword}
//                   onChange={handleChange}
//                   className="border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label
//                   htmlFor="newPassword"
//                   className="font-semibold text-sm text-[#2d1b10]"
//                 >
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   className="border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label
//                   htmlFor="confirmNewPassword"
//                   className="font-semibold text-sm text-[#2d1b10]"
//                 >
//                   Confirm New Password
//                 </label>
//                 <input
//                   type="text"
//                   id="confirmNewPassword"
//                   name="confirmNewPassword"
//                   value={formData.confirmNewPassword}
//                   onChange={handleChange}
//                   className="border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>
//           </main>

//           <footer className="w-full p-4 border-t border-[#e7d9c9] flex justify-end gap-3">
//             <button
//               onClick={handleCloseModal}
//               className="border border-[#c2410c] text-[#c2410c] px-4 py-1.5 rounded-lg text-sm hover:bg-[#c2410c] hover:text-white transition"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               className="flex items-center gap-2 bg-[#c2410c] text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition"
//               onClick={handleChangePassword}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <LuLoaderCircle className="animate-spin" /> Changing...
//                 </>
//               ) : (
//                 "Change Password"
//               )}
//             </button>
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PasswordChangeModal;

import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import api from "../../config/api.config";
import toast from "react-hot-toast";

const PasswordChangeModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    setIsLoading(true);

    try {
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New password and confirm password do not match.");
        setIsLoading(false);
        return;
      }

      const res = await api.patch("/common/change-password", formData);

      toast.success("Password changed successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during password change. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 bg-black/60 backdrop-blur-xs flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto relative">
        <header className="flex justify-between items-center p-4 border-b border-[#e7d9c9]">
          <div className="font-bold text-xl text-[#c2410c]">
            Change Password
          </div>

          <button onClick={handleCloseModal}>
            <IoIosCloseCircleOutline className="text-red-400 hover:text-red-700 text-2xl transition" />
          </button>
        </header>

        <main>
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="oldPassword"
                className="font-semibold text-sm text-[#2d1b10]"
              >
                Current Password
              </label>

              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="newPassword"
                className="font-semibold text-sm text-[#2d1b10]"
              >
                New Password
              </label>

              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmNewPassword"
                className="font-semibold text-sm text-[#2d1b10]"
              >
                Confirm New Password
              </label>

              <input
                type="text"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="border border-[#e7d9c9] rounded-lg px-3 py-2 outline-none focus:border-[#c2410c] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </div>
          </div>
        </main>

        <footer className="w-full p-4 border-t border-[#e7d9c9] flex justify-end gap-3">
          <button
            onClick={handleCloseModal}
            className="border border-[#c2410c] text-[#c2410c] px-4 py-1.5 rounded-lg text-sm hover:bg-[#c2410c] hover:text-white transition"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            onClick={handleChangePassword}
            className="flex items-center gap-2 bg-[#c2410c] text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LuLoaderCircle className="animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PasswordChangeModal;