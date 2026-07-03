import React, { useState } from "react";
import Sidebar from "../../components/userDashboard/Sidebar";
import Overview from "../../components/userDashboard/Overview";
import Orders from "../../components/userDashboard/Orders";
import Settings from "../../components/userDashboard/Settings";
import WishList from "../../components/userDashboard/WishList";

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="w-5/6 border border-green-500 h-full P-3">
          {active === "Overview" && <Overview />}
          {active === "Orders" && <Orders />}
          {active === "WishList" && <WishList />}
          {active === "Settings" && <Settings />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   FiUser, FiMail, FiPhone, FiCalendar, FiSettings,
//   FiHeart, FiShoppingBag, FiMapPin, FiCreditCard,
//   FiGift, FiLogOut, FiEdit, FiHome, FiStar,
// } from "react-icons/fi";

// const UserDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [activeTab, setActiveTab] = useState("Overview");

//   useEffect(() => {
//     setUserData(JSON.parse(sessionStorage.getItem("UserData")));
//   }, []);

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-gray-900 via-orange-950 to-gray-900 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
//           <p className="text-white font-semibold animate-pulse">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     { label: "Overview", icon: <FiHome size={16} /> },
//     { label: "Orders", icon: <FiShoppingBag size={16} /> },
//     { label: "Wishlist", icon: <FiHeart size={16} /> },
//     { label: "Settings", icon: <FiSettings size={16} /> },
//   ];

//   const quickActions = [
//     { icon: <FiShoppingBag size={20} />, label: "My Orders", to: "/orders", bg: "from-orange-500 to-red-500" },
//     { icon: <FiHeart size={20} />, label: "Wishlist", to: "/wishlist", bg: "from-pink-500 to-rose-500" },
//     { icon: <FiMapPin size={20} />, label: "Addresses", to: "/addresses", bg: "from-blue-500 to-indigo-500" },
//     { icon: <FiCreditCard size={20} />, label: "Payments", to: "/payments", bg: "from-green-500 to-emerald-500" },
//     { icon: <FiGift size={20} />, label: "Offers", to: "/offers", bg: "from-yellow-500 to-orange-500" },
//     { icon: <FiSettings size={20} />, label: "Settings", to: "/settings", bg: "from-gray-500 to-gray-700" },
//   ];

//   const infoItems = [
//     { icon: <FiMail size={14} />, label: "Email", value: userData.email },
//     { icon: <FiPhone size={14} />, label: "Phone", value: userData.phone },
//     { icon: <FiUser size={14} />, label: "Gender", value: userData.gender || "Not set" },
//     { icon: <FiCalendar size={14} />, label: "Date of Birth", value: userData.dob?.split("T")[0] || "Not set" },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-900 via-orange-950 to-gray-900 pt-20">

//       {/* ── Banner ── */}
//       <div className="bg-linear-to-r from-orange-500 via-red-500 to-pink-500 px-6 sm:px-8 py-8 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-52 h-52 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

//         <div className="relative max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-5">

//           {/* Avatar */}
//           <div className="relative shrink-0">
//             <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
//               <img src={userData.photo} alt={userData.fullName} className="w-full h-full object-cover" />
//             </div>
//             <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
//           </div>

//           {/* Info */}
//           <div className="flex-1 text-white text-center sm:text-left">
//             <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">
//               Food Lover
//             </span>
//             <h1 className="text-2xl sm:text-3xl font-extrabold">{userData.fullname}</h1>
//             <p className="text-white/75 text-sm">{userData.email}</p>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-3 shrink-0">
//             {[
//               { value: "12", label: "Orders" },
//               { value: "3", label: "Wishlist" },
//               { value: "4.8", label: "Rating" },
//             ].map((s) => (
//               <div key={s.label} className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-center text-white w-16">
//                 <p className="text-lg font-extrabold leading-tight">{s.value}</p>
//                 <p className="text-xs text-white/70">{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="max-w-5xl mx-auto px-6 sm:px-8 py-6">
//         <div className="flex flex-col lg:flex-row gap-5 items-start">

//           {/* ── Sidebar ── */}
//           <div className="w-full lg:w-56 shrink-0 flex flex-col gap-4">

//             {/* Tabs */}
//             <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-2 flex flex-row lg:flex-col gap-1">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.label}
//                   onClick={() => setActiveTab(tab.label)}
//                   className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition duration-300 w-full ${
//                     activeTab === tab.label
//                       ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow"
//                       : "text-gray-300 hover:bg-white/10 hover:text-white"
//                   }`}
//                 >
//                   {tab.icon}
//                   <span className="hidden lg:inline">{tab.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Profile Info */}
//             <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-3">
//               <p className="text-white font-bold text-sm">Profile Info</p>

//               {infoItems.map((item) => (
//                 <div key={item.label} className="flex items-center gap-2.5">
//                   <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
//                     {item.icon}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-gray-400 text-xs leading-none mb-0.5">{item.label}</p>
//                     <p className="text-white text-xs font-semibold truncate">{item.value}</p>
//                   </div>
//                 </div>
//               ))}

//               <button className="mt-1 w-full flex items-center justify-center gap-1.5 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-bold py-2.5 rounded-xl hover:opacity-90 transition">
//                 <FiEdit size={12} /> Edit Profile
//               </button>

//               <button className="w-full flex items-center justify-center gap-1.5 border border-red-500/40 text-red-400 text-xs font-bold py-2.5 rounded-xl hover:bg-red-500/10 transition">
//                 <FiLogOut size={12} /> Logout
//               </button>
//             </div>
//           </div>

//           {/* ── Main Content ── */}
//           <div className="flex-1 min-w-0 flex flex-col gap-5">

//             {/* Welcome */}
//             <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//               <div>
//                 <h2 className="text-xl font-extrabold text-gray-900">
//                   Welcome back,{" "}
//                   <span className="text-orange-500">{userData.fullName.split(" ")[0]}</span>!
//                 </h2>
//                 <p className="text-gray-400 text-sm mt-0.5">Here's what's happening with your account today.</p>
//               </div>
//               <Link
//                 to="/products"
//                 className="shrink-0 bg-linear-to-r from-orange-500 to-red-500 text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
//               >
//                 Order Now
//               </Link>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-5">
//               <p className="text-white font-bold text-sm mb-4">Quick Actions</p>
//               <div className="grid grid-cols-6 gap-3">
//                 {quickActions.map((action) => (
//                   <Link
//                     key={action.label}
//                     to={action.to}
//                     className="flex flex-col items-center gap-1.5 group"
//                   >
//                     <div className={`w-11 h-11 rounded-2xl bg-linear-to-br ${action.bg} flex items-center justify-center text-white shadow group-hover:scale-110 transition duration-300`}>
//                       {action.icon}
//                     </div>
//                     <span className="text-gray-400 text-xs font-medium group-hover:text-white transition text-center leading-tight">
//                       {action.label}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Orders */}
//             <div className="bg-white rounded-2xl shadow-lg p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-base font-extrabold text-gray-900">Recent Orders</p>
//                 <Link to="/orders" className="text-orange-500 text-sm font-semibold hover:underline flex items-center gap-1">
//                   View All <FiShoppingBag size={13} />
//                 </Link>
//               </div>
//               <div className="flex flex-col items-center justify-center py-8 text-center">
//                 <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-3">
//                   <FiShoppingBag size={24} className="text-orange-400" />
//                 </div>
//                 <p className="text-gray-700 font-semibold text-sm">No orders yet</p>
//                 <p className="text-gray-400 text-xs mt-1">Your recent orders will appear here</p>
//                 <Link
//                   to="/products"
//                   className="mt-4 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-5 py-2 rounded-xl hover:opacity-90 transition"
//                 >
//                   Order Now
//                 </Link>
//               </div>
//             </div>

//             {/* Promo */}
//             <div className="bg-linear-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-white">
//                 <div className="flex items-center gap-2 mb-1">
//                   <FiGift size={14} />
//                   <span className="bg-white/20 text-xs font-semibold px-2.5 py-0.5 rounded-full">Special Offer</span>
//                 </div>
//                 <h3 className="text-xl font-extrabold">Get 20% OFF</h3>
//                 <p className="text-white/80 text-xs mt-0.5">
//                   Use code{" "}
//                   <span className="font-bold bg-white/20 px-2 py-0.5 rounded-lg">CRAV20</span>
//                 </p>
//               </div>
//               <Link
//                 to="/products"
//                 className="shrink-0 bg-white text-red-500 font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition text-sm"
//               >
//                 Grab Deal
//               </Link>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;