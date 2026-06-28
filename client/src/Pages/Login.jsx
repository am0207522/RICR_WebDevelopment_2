import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryboy from "../assets/deliveryboy.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data submitted:", loginData);
    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };
  };

  return (
    <>
      <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10 ">
        <div className="hidden md:block">
          <img src={deliveryboy} alt="" className="rotate-y-180 height-50vh" />
        </div>
        <div className="w-md bg-(--background) text-gray-600 rounded shadow p-10 flex flex-col justify-center">
          <div className="text-center text-1xl font-bold text-gray-600 mb-2">
            Welcome Back!
          </div>
          <h1 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#c0392b] text-white py-2 mt-8 rounded font-semibold hover:bg-[#a93226] transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-[#c0392b] hover:underline font-semibold"
              >
                Register here
              </button>
            </p>
            <p className="text-sm">
              Having Trouble?{" "}
              <button
                onClick={() => navigate("/contact-us")}
                className="text-[#c0392b] hover:underline font-semibold"
              >
                Contact Us
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;