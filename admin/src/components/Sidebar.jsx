import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const baseNavLinkClass = "flex items-center gap-4 py-3 px-4 md:px-6 lg:px-8 cursor-pointer text-gray-700 font-medium text-base rounded-lg mx-2 transition-all duration-200 ease-in-out";
  const activeNavLinkClass = "bg-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-sm";
  const hoverNavLinkClass = "hover:bg-blue-50 hover:text-blue-600"; 

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 shadow-sm pt-6 pb-4">
      {aToken && (
        <ul className="flex flex-col gap-1"> 
          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/admin-dashboard"}
          >
            <img className="w-5 h-5 object-contain" src={assets.home_icon} alt="Dashboard Icon" /> 
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/all-appointments"}
          >
            <img className="w-5 h-5 object-contain" src={assets.appointment_icon} alt="Appointments Icon" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/add-doctor"}
          >
            <img className="w-5 h-5 object-contain" src={assets.add_icon} alt="Add Doctor Icon" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/doctor-list"}
          >
            <img className="w-5 h-5 object-contain" src={assets.people_icon} alt="Doctors List Icon" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="flex flex-col gap-1"> 
          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/doctor-dashboard"}
          >
            <img className="w-5 h-5 object-contain" src={assets.home_icon} alt="Dashboard Icon" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/doctor-appointments"}
          >
            <img className="w-5 h-5 object-contain" src={assets.appointment_icon} alt="Appointments Icon" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${baseNavLinkClass} ${hoverNavLinkClass} ${isActive ? activeNavLinkClass : ""}`
            }
            to={"/doctor-profile"}
          >
            <img className="w-5 h-5 object-contain" src={assets.people_icon} alt="Profile Icon" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;