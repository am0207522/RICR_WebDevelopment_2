import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3f3f46] text-white py-10">
      <div className="container mx-auto px-6">
        {/* Tagline - centered, full width, matches screenshot */}
        <p className="text-center text-white/90 text-sm md:text-base mb-10">
          --- Your favorite food delivery platform connecting customers with
          restaurants and riders. ---
        </p>

        {/* Logo + Link columns row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-16 mb-10">
          {/* Logo */}
          <div className="shrink-0">
            <img
              src="/circleLogo.png"
              alt="Logo"
              className="w-[140px] h-[140px] object-contain"
            />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 w-full md:flex md:justify-between md:w-full text-center md:text-left">
            <div>
              <h5 className="font-bold text-white mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-[#c2410c] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#c2410c] transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order-now"
                    className="hover:text-[#c2410c] transition"
                  >
                    Order Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3">For Restaurants</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/register"
                    className="hover:text-[#c2410c] transition"
                  >
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-[#c2410c] transition">
                    Restaurant Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3">For Riders</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/register"
                    className="hover:text-[#c2410c] transition"
                  >
                    Become a Rider
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-[#c2410c] transition">
                    Rider Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3">
                Feedback &amp; Support
              </h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/feedback"
                    className="hover:text-[#c2410c] transition"
                  >
                    Submit Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-[#c2410c] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-[#c2410c] transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-6"></div>

        {/* Bottom row: copyright + policy links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="mb-0">© 2026 Cravings. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-[#c2410c] transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-[#c2410c] transition"
            >
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-[#c2410c] transition">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";

// const Footer = () => {
//   return (
//     <>
//       <div className="bg-gray-800 text-white p-4">
//         <p>&copy; 2023 Your Company. All rights reserved.</p>
//       </div>
//     </>
//   );
// };

// export default Footer;
