import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/"); // Navigate to home or login page
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3 border-b border-gray-200 bg-white shadow-sm font-sans"> 
      {/* Logo and Role Tag */}
      <div className="flex items-center gap-3"> 
        <img
          className="h-9 md:h-10 object-contain cursor-pointer" 
          src={assets.logo} 
          alt="ClinicWay Logo"
          onClick={() => navigate("/")}
        />
        <span className="px-3 py-1 rounded-full text-xs font-semibold text-blue-700 bg-blue-100 border border-blue-200"> 
          {aToken ? "Admin Panel" : "Doctor Panel"} 
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-blue-600 text-white text-base px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md" // Enhanced button style
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;