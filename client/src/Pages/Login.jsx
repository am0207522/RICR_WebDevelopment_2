import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // SIR KA LOGIC: setRole bhi context se liya (tumhare original code mein nahi tha)
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  // TUMHARA ORIGINAL: password show/hide state (dono ke code mein same tha)
  const [showPassword, setShowPassword] = useState(false);

  // SIR KA LOGIC: loading state add ki (tumhare original code mein nahi thi)
  const [loading, setLoading] = useState(false);

  // SIR KA LOGIC: variable naam "loginData" se "formData" kiya + rememberMe field add ki
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // SIR KA LOGIC: naya field, tumhare code mein nahi tha
  });

  // SIR KA LOGIC: single string "validateError" ki jagah object "errors" (field-wise error ke liye)
  const [errors, setErrors] = useState({});

  // SIR KA LOGIC: naam "handleChange" se "handleInputChange" + checkbox handling add ki
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // SIR KA LOGIC: checkbox ke liye alag handling
    }));
  };

  // SIR KA LOGIC: alag validateForm() function jo object return karta hai (tumhare code mein sirf if-check tha)
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // SIR KA LOGIC: validateForm() call karke errors object set karna
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // SIR KA LOGIC: loading true karna (tumhare code mein nahi tha)
    setLoading(true);
    console.log("Login submitted:", formData); // SIR KA LOGIC: console.log ka text thoda alag tha

    try {
      // TUMHARA ORIGINAL: API call same tarah ka hai dono mein (bas variable naam formData)
      const res = await api.post("/auth/login", {
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      // TUMHARA ORIGINAL: toast, sessionStorage, setUser, setIsLogin — ye sab same tha dono code mein
      toast.success(res.data.message);
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);

      // SIR KA LOGIC: setRole call (tumhare code mein nahi tha)
      setRole(res.data.data.userType);

      // SIR KA LOGIC: userType ke hisaab se 4 dashboards mein navigate (tumhare code mein sirf ek "/customer-dashboard" tha)
      if (res.data.data.userType === "restaurant")
        navigate("/restaurant-dashboard");
      else if (res.data.data.userType === "rider") navigate("/rider-dashboard");
      else if (res.data.data.userType === "admin") navigate("/admin-dashboard");
      else if (res.data.data.userType === "customer")
        navigate("/customer-dashboard");
      else navigate("/customer-dashboard"); // MERA ADDON: fallback safety route, taake koi userType match na ho to bhi app crash na ho
    } catch (error) {
      // MERA ADDON (pichli baar tumne bola tha ye fix karo): "registration" ki jagah "login" wala sahi message
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during login. Please try again.",
      );
    } finally {
      // SIR KA LOGIC: loading false karna (tumhare code mein nahi tha)
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-start bg-cover bg-center p-10 md:pe-30">
      <div className="bg-white rounded-xl shadow-md px-10 py-8 max-w-md w-full min-h-127.5 flex flex-col pt-19">
        <h2 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 mb-11">
          Login to continue your food journey
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7 mb-10">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-[#c0392b]"
              />
              {/* SIR KA LOGIC: field-wise error message (tumhare UI mein pehle single error tha) */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              {/* TUMHARA ORIGINAL: password show/hide wrapper same tha dono mein */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded ps-3 pe-12 py-3 focus:outline-none focus:border-[#c0392b]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c0392b] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {/* SIR KA LOGIC: field-wise error message */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* SIR KA LOGIC: rememberMe checkbox UI (tumhare original UI mein nahi tha) */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                id="rememberMe"
                className="cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember Me
              </label>
            </div>
          </div>

          {/* SIR KA LOGIC: button disable + loading text (tumhare original mein sirf "Login" tha, hamesha enabled) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c0392b] text-white py-3 mb-2 rounded font-semibold hover:bg-[#a93226] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* TUMHARA ORIGINAL: ye poora bottom section same rakha hai, koi change nahi */}
          <div className="flex justify-center gap-1 mt-3 text-sm">
            <p className="mb-0 text-gray-600">Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#c0392b] font-semibold"
              style={{ textDecoration: "none" }}
            >
              Register here
            </button>
          </div>

          <div className="flex justify-center gap-1 mt-2 text-sm">
            <p className="mb-0 text-gray-600">Having Trouble?</p>
            <button
              type="button"
              onClick={() => navigate("/contact-us")}
              className="text-[#c0392b] font-semibold"
            >
              Contact Us
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
