import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[90vh] bg-[url('/foodTable.webp')] bg-cover bg-center flex items-center">
      <div className="max-w-xl bg-white/90 rounded-xl shadow-lg p-8 ms-6 md:ms-20">
        <h1 className="text-5xl font-bold text-[#c0392b] mb-4">
          Welcome to Cravings
        </h1>

        <p className="text-gray-600 text-lg leading-8 mb-6">
          Delicious food delivered to your doorstep. Explore restaurants,
          order your favourite meals, and enjoy fast delivery anytime.
        </p>

        <div className="flex gap-4 mb-10">
          <Link
            to="/register"
            className="bg-[#c0392b] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="border border-[#c0392b] text-[#c0392b] px-6 py-3 rounded-lg hover:bg-[#c0392b] hover:text-white transition"
          >
            Login
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#c0392b]">500+</h2>
            <p className="text-gray-600 text-sm mt-1">
              Restaurants
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#c0392b]">20K+</h2>
            <p className="text-gray-600 text-sm mt-1">
              Happy Users
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#c0392b]">30 Min</h2>
            <p className="text-gray-600 text-sm mt-1">
              Fast Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;