import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const RestaurantSidebar = ({ activeTab, setActiveTab }) => {
  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdDashboard /> },
    { name: "Orders", value: "orders", icon: <FaShoppingCart /> },
    { name: "Menu", value: "menu", icon: <MdMenuBook /> },
  ];

  const settingsTab = {
    name: "Settings",
    value: "settings",
    icon: <IoMdSettings />,
  };

  const renderButton = (item) => (
    <button
      key={item.value}
      className={`flex gap-3 font-semibold items-center border border-transparent hover:border-(--color-primary) transition w-full p-3 rounded-lg ${
        activeTab === item.value
          ? "bg-(--color-primary) text-(--color-primary-content)"
          : "text-(--color-base-content) hover:bg-(--color-base-200)"
      }`}
      onClick={() => setActiveTab(item.value)}
    >
      {item.icon}
      <span>{item.name}</span>
    </button>
  );

  return (
    <div className="p-3 bg-(--color-base-100) rounded-2xl shadow-lg flex flex-col h-full">
      <div className="border-b-2 border-(--color-base-300) text-center text-xl font-bold text-(--color-base-content) pb-3 pt-3">
        Restaurant Dashboard
      </div>

      <div className="space-y-1 p-4 mt-2">
        {mainTabs.map((item) => renderButton(item))}
      </div>

      <div className="space-y-1 px-4 pb-4 mt-auto border-t border-(--color-base-300) pt-3">
        {renderButton(settingsTab)}
      </div>
    </div>
  );
};

export default RestaurantSidebar;