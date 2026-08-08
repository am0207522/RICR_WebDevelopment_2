import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaPowerOff } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../config/api.config.js";

const Navbar = () => {
  const { user, isLogin, role, setUser, setIsLogin, setRole } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (role === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      sessionStorage.removeItem("cravingUser");
      setUser(null);
      setIsLogin(false);
      setRole(null);
      navigate("/");
    } catch (error) {
      toast.error(
        (error.response?.status ? error.response.status + " | " : "") +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <>
      <div className="sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--main) text-white w-full h-16 shadow-md">
        {/* cravings_Logoo  */}
        {/* class="w-fit h-full" */}
        <div className="h-full">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-fit h-full" />
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
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => navigate("/cart")}
                  className="hover:scale-110 transition-transform duration-200"
                  title="Go to Cart"
                >
                  <IoCartOutline className="text-(--color-primary-content) text-3xl" />
                </button>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-(--color-error) text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>

              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user?.photo.url}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start">
                <button
                  onClick={handleNavigate}
                  className="text-base hover:underline hover:text-(--accent)"
                >
                  {user.fullName}
                </button>
                <span className="text-xs text-(--color-primary-content)/80 uppercase">
                  {role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-600"
              >
                <FaPowerOff />
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
                to={"/register"}
                className="hover:underline bg-(--color-primary-content) text-(--main) hover:bg-transparent hover:text-(--color-primary-content) border px-3 py-1 rounded"
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