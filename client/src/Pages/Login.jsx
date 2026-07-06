import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUser, setIsLogin, isLogin } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({...prevData, [name]: value,}));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData
    if (!loginData.email || !loginData.password) {
      setValidateError("Please fill in all fields.");
      return;
    }

    setValidateError("");
    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };
    console.log("Login data submitted:", loginData);

    try {
      const res = await api.post("/auth/login", payload);
      toast.success(res.data.message);
      // console.log(res.data.data.photo);
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/userdashboard")
    } catch (error) {
      toast.error(error.response.status + " | " + error.response?.data?.message ||
      error.message);
    }
  };

  return (
    <div
      className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-start bg-cover bg-center p-10 md:pe-30"
    >
<div className="bg-white rounded-xl shadow-md px-10 py-8 max-w-md w-full min-h-[510px] flex flex-col pt-19">        
  <h2 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 mb-11">
          Login to continue your food journey
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7 mb-10">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-[#c0392b]"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          {validateError && (
            <p className="text-red-500 text-sm mb-3">
              {validateError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c0392b] text-white py-3 mb-2  rounded font-semibold hover:bg-[#a93226] transition-colors"
          >
            Login
          </button>

          <div className="flex justify-center gap-1 mt-3 text-sm">
            <p className="mb-0 text-gray-600">
              Don't have an account?
            </p>

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
            <p className="mb-0 text-gray-600">
              Having Trouble?
            </p>

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








    // <div
    //   className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-start bg-cover bg-center p-10 md:ps-30"
    // >
    //   <div className="bg-white rounded-xl shadow-md px-10 py-8 max-w-md w-full flex flex-col">
    //     <h2 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
    //       Welcome Back
    //     </h2>

    //     <p className="text-center text-gray-600 mb-6">
    //       Login to continue your food journey
    //     </p>

    //     <form onSubmit={handleSubmit}>
    //       <div className="flex flex-col gap-5 mb-6">
    //         <div>
    //           <label className="block text-sm font-semibold mb-1">Email</label>
    //           <input
    //             type="email"
    //             name="email"
    //             placeholder="Enter your email"
    //             value={loginData.email}
    //             onChange={handleChange}
    //             required
    //             className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-[#c0392b]"
    //           />
    //         </div>

    //         <div>
    //           <label className="block text-sm font-semibold mb-1">Password</label>
    //           <input
    //             type="password"
    //             name="password"
    //             placeholder="Enter your password"
    //             value={loginData.password}
    //             onChange={handleChange}
    //             required
    //             className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-[#c0392b]"
    //           />
    //         </div>
    //       </div>

    //       {validateError && (
    //         <p className="text-red-500 text-sm mb-3">
    //           {validateError}
    //         </p>
    //       )}

    //       <button
    //         type="submit"
    //         className="w-full bg-[#c0392b] text-white py-3 mb-4 rounded font-semibold hover:bg-[#a93226] transition-colors"
    //       >
    //         Login
    //       </button>

    //       <hr className="border-gray-300 mb-4" />

    //       <div className="flex justify-center gap-1 text-sm">
    //         <p className="mb-0 text-gray-600">
    //           Don't have an account?
    //         </p>

    //         <button
    //           type="button"
    //           onClick={() => navigate("/register")}
    //           className="text-[#c0392b] font-semibold"
    //           style={{ textDecoration: "none" }}
    //         >
    //           Register here
    //         </button>
    //       </div>

    //       <div className="flex justify-center gap-1 mt-2 text-sm">
    //         <p className="mb-0 text-gray-600">
    //           Having Trouble?
    //         </p>

    //         <button
    //           type="button"
    //           onClick={() => navigate("/contact-us")}
    //           className="text-[#c0392b] font-semibold"
    //         >
    //           Contact Us
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>