// import React from "react";
// import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
// import { PiListHeartLight } from "react-icons/pi";
// import { BsPersonGear } from "react-icons/bs";

// const MenuItems = [
//   { name: "Overview", icon: <MdOutlineDashboard /> },
//   { name: "Orders", icon: <MdOutlineFastfood /> },
//   { name: "WishList", icon: <PiListHeartLight /> },
//   { name: "Settings", icon: <BsPersonGear /> },
// ];

// const Sidebar = ({ active, setActive }) => {
//   return (
//     <>
//       <div className="p-3 bg-white rounded-2xl shadow-lg pb-0.5rem !important">
//         <div className="border-b-2 border-[#e7d9c9] text-center text-xl font-bold text-[#2d1b10] pb-3 pt-3">
//           User Dashboard
//         </div>

//         <div className="space-y-1 p-4 mt-2">
//           {MenuItems.map((item, idx) => (
//             <button
//               key={idx}
//               className={`flex gap-3 font-semibold items-center border border-transparent hover:border-[#c2410c] transition w-full p-3 rounded-lg ${
//                 active === item.name
//                   ? "bg-[#c2410c] text-white"
//                   : "text-[#2d1b10] hover:bg-[#fff8f1]"
//               }`}
//               onClick={() => setActive(item.name)}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </>

    
//   );
// };

// export default Sidebar;


import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";

// CHANGED: MenuItems array ko do parts mein split kiya —
// mainTabs (Overview, Orders, WishList) aur settingsTab (Settings alag)
// Isse Settings button divider ke neeche, alag section mein render hoga
const mainTabs = [
  { name: "Overview", icon: <MdOutlineDashboard /> },
  { name: "Orders", icon: <MdOutlineFastfood /> },
  { name: "WishList", icon: <PiListHeartLight /> },
];

const settingsTab = { name: "Settings", icon: <BsPersonGear /> };

const Sidebar = ({ active, setActive }) => {
  // CHANGED: button render karne wala JSX ek function mein nikala,
  // taaki mainTabs aur settingsTab dono ke liye same button reuse ho sake
  // (logic/styling bilkul same hai jo pehle tha)
  const renderButton = (item) => (
    <button
      key={item.name}
      className={`flex gap-3 font-semibold items-center border border-transparent hover:border-[#c2410c] transition w-full p-3 rounded-lg ${
        active === item.name
          ? "bg-[#c2410c] text-white"
          : "text-[#2d1b10] hover:bg-[#fff8f1]"
      }`}
      onClick={() => setActive(item.name)}
    >
      {item.icon}
      <span>{item.name}</span>
    </button>
  );

  return (
    <>
      <div className="p-3 bg-white rounded-2xl shadow-lg pb-0.5rem !important flex flex-col h-full">
        <div className="border-b-2 border-[#e7d9c9] text-center text-xl font-bold text-[#2d1b10] pb-3 pt-3">
          User Dashboard
        </div>

        {/* Main tabs — Overview, Orders, WishList */}
        <div className="space-y-1 p-4 mt-2">
          {mainTabs.map((item) => renderButton(item))}
        </div>

        {/* CHANGED: Settings ko divider ke saath alag section mein daala */}
        <div className="space-y-1 px-4 pb-4 mt-auto border-t border-[#e7d9c9] pt-3">
          {renderButton(settingsTab)}
        </div>
      </div>
    </>
  );
};

export default Sidebar;