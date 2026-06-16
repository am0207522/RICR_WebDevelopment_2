import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    agreeTerms: false,
  });

  const [validateError, setValidateError] = useState();

  // Teacher's pattern: single handleChange for all inputs
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Teacher's pattern: async handleSubmit with e.preventDefault()
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register data submitted:", registerData);

    // Teacher's pattern: build payload with .toLowerCase() on email
    const payload = {
      name: registerData.name,
      email: registerData.email.toLowerCase(),
      phone: registerData.phone,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
      role: registerData.role,
    };

    console.log("Payload:", payload);
    // TODO: send payload to server
  };

  return (
    <div
      className="h-[90vh] bg-[url('public/foodTable.webp')] flex items-center justify-end bg-cover bg-center p-10 md:pe-30"
    >
      <div className="bg-white rounded-xl shadow-md px-10 py-6 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Join us as a Customer, Restaurant, or Rider
        </p>

        {/* Teacher's pattern: onSubmit on the form tag */}
        <form onSubmit={handleSubmit}>

          {/* Role Radio Buttons — using handleChange with name="role" */}
          <div className="mb-4">
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
                    onChange={handleChange}   // ✅ Teacher's pattern
                    className="accent-[#c0392b]"
                  />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              name="name"                         // ✅ name attr for handleChange
              placeholder="Enter your full name"
              value={registerData.name}           // ✅ controlled input
              onChange={handleChange}             // ✅ Teacher's pattern
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={registerData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          {/* Checkbox — handleChange uses e.target.checked automatically */}
          <div className="mb-4 flex items-center gap-2">
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
          </div>

          <button
            type="submit"
            className="w-full bg-[#c0392b] text-white py-2 rounded font-semibold hover:bg-[#a93226] transition-colors"
          >
            Register
          </button>

          <div className="flex justify-center gap-1 mt-3 text-sm">
            <p className="mb-0 text-gray-600">Already registered?</p>
            <Link
              to="/login"
              className="text-[#c0392b] font-semibold"
              style={{ textDecoration: "none" }}
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
