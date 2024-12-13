import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#ee9b00] h-[10vh] flex justify-between items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex-1 text-center py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-black bg-[#ffd700]" 
              : "text-white hover:text-[#222222] hover:bg-[#f4d160]" 
          }`
        }
      >
        Meals
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex-1 text-center py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-black bg-[#ffd700]" // Active: Black text, light gold background
              : "text-white hover:text-[#222222] hover:bg-[#f4d160]" // Hover: Dark gray text, light yellow background
          }`
        }
      >
        Cocktails
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          `flex-1 text-center py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-black bg-[#ffd700]" // Active: Black text, light gold background
              : "text-white hover:text-[#222222] hover:bg-[#f4d160]" // Hover: Dark gray text, light yellow background
          }`
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `flex-1 text-center py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-black bg-[#ffd700]" // Active: Black text, light gold background
              : "text-white hover:text-[#222222] hover:bg-[#f4d160]" // Hover: Dark gray text, light yellow background
          }`
        }
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;