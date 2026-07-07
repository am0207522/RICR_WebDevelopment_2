import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/api.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validateError, setValidateError] = useState();

  // Show/Hide Password Added visibility toggle state
  const [showPassword, setShowPassword] = useState(false);
  // Show/Hide Confirm Password Added visibility toggle state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // single handleChange for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  // async handleSubmit with e.preventDefault()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      setValidateError("Passwords do not match");
      return;
    }

    setValidateError("");
    console.log("Register data submitted:", registerData);

    const payload = {
      fullName: registerData.fullName,
      gender: registerData.gender,
      dob: registerData.dob,
      phone: registerData.phone,
      email: registerData.email.toLowerCase(),
      password: registerData.password,
    };

    try {
      const res = await api.post("/auth/register", payload);
      toast.success(res.data.message);
      // Proactive enhancement: direct user back to your working login page once registered
      navigate("/login"); 
    } catch (error) {
      toast.error(error.res?.data?.message || error.message);
    }
  };

  return (
    <div className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-end bg-cover bg-center p-10 md:pe-30">
      <div className="bg-white rounded-xl shadow-md px-10 py-6 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Join us as a Customer, Restaurant, or Rider
        </p>

        {/* onSubmit on the form tag */}
        <form onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              name="fullName" 
              placeholder="Enter your full name"
              value={registerData.fullName} 
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <select
              name="gender"
              value={registerData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-[#c0392b]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="date"
              name="dob"
              value={registerData.dob}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={registerData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          {/* FIXED: Wrapped the password layout inside a relative div for structural positioning */}
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleChange}
              required
              // FIXED: Replaced px-3/pr-10 with clean ps-3 pe-12 padding utilities
              className="w-full border border-gray-300 rounded ps-3 pe-12 py-2 focus:outline-none focus:border-[#c0392b]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              // FIXED: Adjusted button alignment classes to match the design language of your login page perfectly
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c0392b] transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* FIXED: Wrapped the confirm password layout inside a relative container */}
          <div className="relative w-full mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded ps-3 pe-12 py-2 focus:outline-none focus:border-[#c0392b]"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c0392b] transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {validateError && (
            <p className="text-red-500 text-sm mb-3">{validateError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c0392b] text-white py-2 rounded font-semibold hover:bg-[#a93226] transition-colors"
          >
            Register
          </button>
        </form>

        {/* FIXED: Re-built your clipped/missing bottom footer link wrapper to redirect users smoothly back to login */}
        <div className="flex justify-center gap-1 mt-4 text-sm">
          <p className="mb-0 text-gray-600">Already Have an Account?</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#c0392b] font-semibold hover:underline focus:outline-none"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
