import { assets } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the doctors page, passing the search query as a URL parameter
      navigate(`/doctors?q=${searchQuery.trim()}`);
      setSearchQuery(""); // Clear search input after search
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-6 md:p-12 lg:p-20 overflow-hidden shadow-lg transform translate-y-4">
      
      <img
        className="absolute bottom-0 right-0 h-4/5 md:h-full lg:h-full object-contain z-10 opacity-70 hidden md:block"
         src={assets.doci}
        alt="Healthcare Professionals"
      />

      {/* Content wrapper for better layering */}
      <div className="relative z-20 flex flex-col md:flex-row flex-wrap items-center md:items-start">
        {/* Left side content */}
        <div className="md:w-3/5 lg:w-1/2 flex flex-col items-start justify-center gap-8 py-10 md:py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-extrabold leading-tight tracking-tight">
            Find & Book <br />
            Your Ideal Doctor
          </h1>
          <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
            Easily search, compare, and book appointments with trusted healthcare
            professionals in your area. Your health, simplified.
          </p>

          {/* Search Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center bg-white rounded-full shadow-lg p-2 gap-2">
            <input
              type="text"
              placeholder="Search for doctors, specialities..."
              className="flex-1 p-3 pl-6 outline-none bg-transparent rounded-full text-gray-800 text-lg placeholder-gray-500 focus:ring-2 focus:ring-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Search
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;





