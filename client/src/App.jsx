import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import Footer from "./components/Footer";
import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import RiderDashboard from "./pages/dashboard/RiderDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />      {/* dashborad routes */} 
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
};

export default App;