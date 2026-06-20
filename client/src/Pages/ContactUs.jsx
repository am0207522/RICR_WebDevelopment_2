import React from "react";

const Contactus = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-[#c0392b] mb-6">
          Contact Us
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 border-t pt-6 text-center text-gray-600">
          <p>📍 123 Main Street, New Delhi, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contactus;