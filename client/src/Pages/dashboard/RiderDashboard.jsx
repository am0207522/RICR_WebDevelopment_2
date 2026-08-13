import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RiderSidebar from "../../components/riderDashboard/RiderSidebar";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderOrders from "../../components/riderDashboard/RiderOrders";
import RiderSetting from "../../components/riderDashboard/RiderSetting";

const RiderDashboard = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const active = useLocation().state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");

  if (!isLogin || role !== "rider") {
    return (
      <div className="h-[92vh] bg-[url('/foodTable.webp')]  bg-cover bg-center">
        <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold text-(--color-neutral-content)">
            Access Denied. Please log in as a Rider to view this page.
          </h1>
          <button
            className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-stretch min-h-[92vh]">
      <div className="w-1/6 h-full">
        <RiderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="w-5/6 h-full p-3">
        {activeTab === "overview" && <RiderOverview />}
        {activeTab === "orders" && <RiderOrders />}
        {activeTab === "settings" && <RiderSetting />}
      </div>
    </div>
  );
};

export default RiderDashboard;