import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-(--secondary) text-(--primary)">
        <div>
          Cravings
        </div>

        <div className="flex gap-4">
          <Link to="/" className="hover:underline ">
          Home
          </Link>

          <Link to={"/login"} className="hover:underline">
          Login
          </Link>

          <Link to={"/register"} className="hover:underline">
          Register
          </Link>

          <Link to={"/contact-us"} className="hover:underline">
          ContactUs
          </Link>

        </div>

      </div>
    </>
  )
}
export default Navbar;
