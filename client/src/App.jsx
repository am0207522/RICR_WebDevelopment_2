import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/dashboard/UserDashboard";
import Footer from "./components/Footer";

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

        {/* dashborad routes */}
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
};

export default App;