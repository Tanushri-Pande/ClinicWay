
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="mx-auto p-4 md:p-6 lg:p-8 font-sans"> {/* Centered content, consistent padding */}
      <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">All Doctors</h1> {/* Consistent title style */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5"> {/* Responsive grid layout, increased gap */}
        {doctors.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-10">No doctors found.</div>
        ) : (
          doctors.map((item, index) => (
            <div
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md cursor-pointer group hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              key={index}
            >
              <img
                className="w-full h-52 object-cover bg-blue-50 group-hover:bg-blue-100 transition-all duration-500 transform group-hover:scale-105" // Larger image, subtle hover scale
                src={item.image}
                alt={item.name}
              />
              <div className="p-5"> 
                <p className="text-gray-900 text-xl font-bold mb-1"> 
                  {item.name}
                </p>
                <p className="text-blue-600 text-sm font-medium">{item.speciality}</p> 
                <div className="mt-4 flex items-center gap-2 text-base text-gray-700"> 
                  <label htmlFor={`availability-${item._id}`} className="flex items-center gap-2 cursor-pointer">
                      <input
                        onChange={() => changeAvailability(item._id)}
                        type="checkbox"
                        checked={item.available}
                        id={`availability-${item._id}`}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 transition-colors duration-200" // Styled checkbox
                      />
                      <span>Available</span>
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;