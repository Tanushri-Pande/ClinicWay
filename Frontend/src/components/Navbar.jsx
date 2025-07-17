import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; 
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home after logout
  };

  return (
    
    <div className="sticky top-0 z-50 w-full bg-white shadow-md py-4 px-4 md:px-8 lg:px-12 flex items-center justify-between font-sans text-gray-700">
      
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <img
          className="w-44 cursor-pointer" 
          src={assets.logo} 
          alt="ClinicWay Icon"
        />
        
      </div>

      {/* Main Navigation Links (Desktop) */}
      <ul className="hidden md:flex items-center gap-7 lg:gap-10 font-medium text-base">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500 transition-colors pb-1"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500 transition-colors pb-1"
          }
        >
          ALL DOCTORS
        </NavLink>
        {/* My Appointments link - visible only if logged in on desktop */}
        {token && (
          <NavLink
            to="/my-appointments"
            className={({ isActive }) =>
              isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500 transition-colors pb-1"
            }
          >
            MY APPOINTMENTS
          </NavLink>
        )}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500 transition-colors pb-1"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500 transition-colors pb-1"
          }
        >
          CONTACT
        </NavLink>
      </ul>

      {/* Right side: Auth buttons/User dropdown & Mobile Menu Icon */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative flex items-center gap-2 cursor-pointer group">
            {/* User Profile Image */}
            <img className="w-9 h-9 rounded-full object-cover border-2 border-blue-300" src={userData.image} alt="User Profile" />
            {/* Dropdown Indicator */}
            <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />
            {/* Dropdown Menu (Desktop) */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl text-base text-gray-700 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top-right invisible">
              <div className="flex flex-col gap-2 p-4">
                <p
                  onClick={() => { navigate("/my-profile"); }} // No setShowMenu here, as it's desktop
                  className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  My Profile
                </p>
                <p
                  onClick={() => { navigate("/my-appointments"); }} // No setShowMenu here
                  className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  My Appointments
                </p>
                <hr className="my-1 border-gray-200" />
                <p
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hidden md:block hover:bg-blue-700 transition-all shadow-md"
            >
              Create Account
            </button>
          </>
        )}

        {/* Mobile Menu Toggle Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-7 h-7 md:hidden cursor-pointer"
          src={assets.menu_bar}
          alt="Menu"
        />

        {/* ----------------- Mobile Menu Overlay ----------------- */}
        <div
          className={`fixed right-0 top-0 bottom-0 z-[100] bg-white transition-all duration-300 ease-in-out transform ${
            showMenu ? "translate-x-0 w-3/4 sm:w-1/2 shadow-2xl" : "translate-x-full w-0"
          } md:hidden overflow-hidden`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            {/* Mobile Menu Logo */}
            <div className="flex items-center gap-2">
              <img className="w-7 h-7 object-contain" src={assets.logo_icon} alt="ClinicWay Icon" />
              <span className="text-xl font-bold text-gray-900">ClinicWay</span>
            </div>
            {/* Close Button */}
            <img
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          {/* Mobile Navigation Links and User Options */}
          <ul className="flex flex-col gap-1 mt-5 px-4 text-base font-medium">
            <NavLink
              className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
              onClick={() => setShowMenu(false)}
              to="/doctors"
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              CONTACT
            </NavLink>

            {/* Conditional User-specific Links for Mobile */}
            {token ? (
              <>
                <hr className="my-2 border-gray-200" />
                <NavLink
                  className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={() => setShowMenu(false)}
                  to="/my-profile"
                >
                  My Profile
                </NavLink>
                <NavLink
                  className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={() => setShowMenu(false)}
                  to="/my-appointments"
                >
                  My Appointments
                </NavLink>
                <p
                  onClick={() => { logout(); setShowMenu(false); }} // Close menu after logout
                  className="px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors"
                >
                  Logout
                </p>
              </>
            ) : (
              // Conditional "Create Account" button for Mobile if not logged in
              <button
                onClick={() => { navigate("/login"); setShowMenu(false); }}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold mt-4 hover:bg-blue-700 transition-all shadow-md w-full"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
