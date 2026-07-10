import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";

const RestaurantSidebar = ({ activeTab, setActiveTab }) => {
  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdOutlineDashboard /> },
    { name: "Orders", value: "orders", icon: <MdOutlineFastfood /> },
  ];

  const settingsTab = { name: "Settings", value: "settings", icon: <BsPersonGear /> };

  const renderButton = (item) => (
    <button
      key={item.value}
      className={`flex gap-3 font-semibold items-center border border-transparent hover:border-[#c2410c] transition w-full p-3 rounded-lg ${
        activeTab === item.value
          ? "bg-[#c2410c] text-white"
          : "text-[#2d1b10] hover:bg-[#fff8f1]"
      }`}
      onClick={() => setActiveTab(item.value)}
    >
      {item.icon}
      <span>{item.name}</span>
    </button>
  );

  return (
    <>
      <div className="p-3 bg-white rounded-2xl shadow-lg pb-0.5rem !important flex flex-col h-full">
        <div className="border-b-2 border-[#e7d9c9] text-center text-xl font-bold text-[#2d1b10] pb-3 pt-3">
          Admin Dashboard
        </div>

        <div className="space-y-1 p-4 mt-2">
          {mainTabs.map((item) => renderButton(item))}
        </div>

        <div className="space-y-1 px-4 pb-4 mt-auto border-t border-[#e7d9c9] pt-3">
          {renderButton(settingsTab)}
        </div>
      </div>
    </>
  );
};

export default RestaurantSidebar;