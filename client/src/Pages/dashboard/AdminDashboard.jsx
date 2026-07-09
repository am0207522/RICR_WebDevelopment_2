import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSetting from "../../components/adminDashboard/AdminSetting";
import AdminSidebar from "../../components/adminDashboard/AdminSidebar";
import AdminOverview from "../../components/adminDashboard/AdminOverview";
import AdminOrders from "../../components/adminDashboard/AdminOrders";

const AdminDashboard = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const active = useLocation().state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");

  if (!isLogin || role !== "admin") {
    return (
      <div className="h-[92vh] bg-[url('/foodTable.webp')]  bg-cover bg-center">
        <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold text-(--color-neutral-content)">
            Access Denied. Please log in as a Admin to view this page.
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
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="w-5/6 border border-green-500 h-full P-3">
          {active === "Overview" && <AdminOverview />}
          {active === "Orders" && <AdminOrders />}
          {active === "Settings" && <AdminSetting />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
