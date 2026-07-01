import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.config";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [validateError, setValidateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // single handleChange for all inputs
  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;

    setContactData((prevData) => ({ ...prevData, [name]: value,}));
  };

  // async handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !contactData.fullName ||
      !contactData.email ||
      !contactData.phone ||
      !contactData.subject ||
      !contactData.message
    ) {
      setValidateError("All fields are required");
      return;
    }

    setValidateError("");
    setSuccessMessage(
      "Thank you for contacting us! We'll get back to you soon."
    );

    console.log("Contact data submitted:", contactData);

    const payload = {
      fullName: contactData.fullName,
      email: contactData.email.toLowerCase(),
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
    };

try {
  const res = await api.post("/contact", payload);

  setSuccessMessage(
    res.data.message || "Thank you for contacting us! We'll get back to you soon."
  );

  setTimeout(() => {
    setContactData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setSuccessMessage("");
  }, 3000);
} catch (error) {
  console.log(error?.response?.data?.message || error.message);
  setValidateError(error?.response?.data?.message || "Something went wrong. Try again.");
}
};
  return (
    <div
      className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-end bg-cover bg-center p-10 md:pe-30"
    >
      <div className="bg-white rounded-xl shadow-md px-10 py-6 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-[#c0392b] mb-2">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-4">
          We'd love to hear from you
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={contactData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={contactData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={contactData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />

            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={contactData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#c0392b]"
            />

            <textarea
              rows={5}
              name="message"
              placeholder="Write your message..."
              value={contactData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:border-[#c0392b]"
            />
          </div>

          {validateError && (
            <p className="text-red-500 text-sm mb-3">
              {validateError}
            </p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm mb-3">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c0392b] text-white py-2 rounded font-semibold hover:bg-[#a93226] transition-colors"
          >
            Send Message
          </button>

          <div className="flex justify-center gap-1 mt-3 text-sm">
            <p className="mb-0 text-gray-600">
              Want to order delicious food?
            </p>

            <Link
              to="/login"
              className="text-[#c0392b] font-semibold"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>

            <span>|</span>

            <Link
              to="/register"
              className="text-[#c0392b] font-semibold"
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;


/* ContactUs.jsx → handleSubmit → api.post("/contact", payload) → backend → MongoDB me save */