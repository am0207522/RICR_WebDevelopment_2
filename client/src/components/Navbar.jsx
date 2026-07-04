import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      sessionStorage.removeItem("UserData");
      setIsLogin(false);
      setUser(false);
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <>
      <div className="sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--main) text-white w-full h-16 shadow-md">
        {/* cravings_Logo  */}
        {/* class="w-fit h-full" */}
        <div className="h-full">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-fit h-full"
            />
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <Link
           to={"/"} 
           className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
           
          >
            Home
          </Link>
          <Link
           to={"/contact-us"} 
           className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
          >
            Contact us
          </Link>
          {isLogin ? (
            <div className="border-s-2 flex justify-center items-center gap-4 px-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Link
                to={"/userDashboard"}
                className="hover:underline hover:text-(--accent)"
              >
                {user.fullName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-600"
              >
                <AiOutlineLogout />
              </button>
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
              >
                Login
              </Link>
              <Link
                to={"/register"} className="hover:underline"
                className="bg-(--color-primary-content) text-(--main) hover:bg-transparent hover:text-(--color-primary-content) border px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
