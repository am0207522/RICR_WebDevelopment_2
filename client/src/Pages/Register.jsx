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

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
  // Show/Hide Confirm Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // single handleChange for all inputs
  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
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
          {/* Role Radio Buttons — - -  using handleChange with name="role" */}

          {/*  customer restaurant rider radio button  */}
          {/* <div className="mb-4">
            <span className="block mb-2 font-medium text-gray-700">
              Register as:
            </span>
            <div className="flex flex-wrap gap-4">
              {["customer", "restaurant", "rider"].map((r) => (
                <label

                  key={r}
                  className="flex items-center gap-1 cursor-pointer text-gray-700"
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={registerData.role === r}
                    onChange={handleChange}
                    className="accent-[#c0392b]"
                  />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              name="fullName" // name attr for handleChange
              placeholder="Enter your full name"
              value={registerData.fullName} // controlled input
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

          <div className="flex flex-col gap-3 mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#c0392b]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#c0392b]"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Checkbox — - - handleChange uses e.target.checked automatically
          <div className="mb-4 mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={registerData.agreeTerms}
              onChange={handleChange}
              className="accent-[#c0392b]"
            />
            <span className="text-gray-700 text-sm">
              I agree to the terms and conditions.
            </span>
          </div> */}

          {validateError && (
            <p className="text-red-500 text-sm">{validateError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c0392b] text-white py-2 rounded font-semibold hover:bg-[#a93226] transition-colors"
          >
            Register
          </button>
        </form>

        <div className="flex justify-center gap-1 mt-3 text-sm">
          <p className="mb-0 text-gray-600">Already Have an Account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-[#c0392b] hover:underline font-semibold"
            style={{ textDecoration: "none" }}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
