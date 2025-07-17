import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 py-20 text-gray-900 md:mx-10 px-4">
      <h1 className="text-4xl font-bold text-gray-900">Our Top Rated Doctors</h1>
      <p className="sm:w-2/3 md:w-1/2 text-center text-lg text-gray-600 leading-relaxed">
        Discover highly-rated medical professionals across various specialities,
        committed to providing exceptional care.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-10">
        {doctors.slice(0, 8).map((item, index) => ( // Limiting to 8 for a cleaner "top doctors" section
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 bg-white transform hover:scale-105"
            key={index}
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
              <p className="text-gray-900 text-xl font-bold ">{item.name}</p>
              <p className="text-blue-600 text-base font-medium">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-600 text-white px-12 py-4 rounded-full mt-12 text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md transform hover:scale-105"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;