
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; 
import { AppContext } from "../context/AppContext";
import MoveUpOnRender from "../components/MoveUpOnRender"; 

const Doctors = () => {
  const { speciality } = useParams(); // For filtering by specialty from URL path
  const location = useLocation(); // For reading search query from URL
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]); 
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q'); 

    let currentDoctors = doctors;

    // First, filter by search query if it exists
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentDoctors = currentDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(lowerCaseQuery) ||
        doctor.speciality.toLowerCase().includes(lowerCaseQuery) ||
        (doctor.location && doctor.location.toLowerCase().includes(lowerCaseQuery)) 
        
      );
    }

    // Then, filter by specialty if it exists in the path
    if (speciality) {
      currentDoctors = currentDoctors.filter((doc) => doc.speciality === speciality);
    }

    setFilteredDoctors(currentDoctors);
  }, [doctors, speciality, location.search]); 

  // Function to determine the main title
  const getPageTitle = () => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (speciality) {
      return `${speciality} Specialists`;
    } else {
      return "All Doctors";
    }
  };

  // Function to handle filter click and navigation
  const handleSpecialityClick = (selectedSpeciality) => {
    if (speciality === selectedSpeciality) {
      
      navigate(`/doctors`);
    } else {
      
      navigate(`/doctors/${selectedSpeciality}`);
    }
    setShowFilter(false); // Close filter menu on selection for mobile
    window.scrollTo(0, 0); // Scroll to top
  };


  return (
    <div className="container mx-auto py-16 px-4 font-sans"> 
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
        {getPageTitle()}
      </h1>

      <p className="text-center text-lg text-gray-600 mb-8">
        Browse through our extensive list of trusted doctors, specialists, and healthcare professionals.
      </p>

      <div className="flex flex-col md:flex-row md:items-start gap-8"> 
        {/* Filter Section */}
        <div className="md:w-1/4 lg:w-1/5 flex flex-col gap-4 text-sm text-gray-600 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <button
            className={`py-2 px-4 border rounded-lg text-base font-semibold transition-all sm:hidden mb-4 ${
              showFilter ? " bg-blue-600 text-white " : "border-blue-300 text-blue-600"
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>

          <h3 className="text-lg font-bold text-gray-800 mb-2 hidden sm:block">Filter by Speciality</h3>
          <div
            className={`flex-col gap-3 ${
              showFilter ? "flex" : "hidden sm:flex" // Mobile toggle for filter options
            }`}
          >
            {/* All Doctors option */}
            <p
              onClick={() => handleSpecialityClick("")} // Clear specialty filter
              className={`pl-4 py-2 pr-4 rounded-lg transition-all cursor-pointer hover:bg-blue-50 hover:text-blue-700 font-medium ${
                !speciality ? "bg-blue-100 text-blue-800 font-semibold" : ""
              }`}
            >
              All Doctors
            </p>
            {/* Speciality list */}
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
              "Orthodentist",
            ].map((spec) => (
              <p
                key={spec}
                onClick={() => handleSpecialityClick(spec)}
                className={`pl-4 py-2 pr-4 rounded-lg transition-all cursor-pointer hover:bg-blue-50 hover:text-blue-700 font-medium ${
                  speciality === spec ? "bg-blue-100 text-blue-800 font-semibold" : ""
                }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full md:flex-grow">
          {filteredDoctors.length === 0 ? (
            <p className="text-center text-xl text-gray-700 py-10">No doctors found matching your criteria.</p>
          ) : (
            <MoveUpOnRender>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((item) => (
                  <div
                    onClick={() => {
                      navigate(`/appointment/${item._id}`);
                      window.scrollTo(0, 0); 
                    }}
                    className="border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 bg-white transform hover:scale-105"
                    key={item._id} 
                  >
                    <img className="w-full h-56 object-cover bg-blue-50" src={item.image} alt={item.name} />
                    <div className="p-5 flex flex-col gap-3">
                      <div
                        className={`flex items-center gap-2 text-sm font-medium ${
                          item.available ? " text-green-600" : "text-gray-500"
                        } `}
                      >
                        <p
                          className={`w-2.5 h-2.5 ${
                            item?.available ? " bg-green-500" : "bg-gray-400"
                          }  rounded-full`}
                        ></p>{" "}
                        <p>{item.available ? "Available Today" : "Not Available"}</p>
                      </div>
                      <p className="text-gray-900 text-xl font-bold ">
                        {item.name}
                      </p>
                      <p className="text-blue-600 text-base font-medium">{item.speciality}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MoveUpOnRender>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;