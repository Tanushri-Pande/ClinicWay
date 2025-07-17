import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-6 py-20 text-gray-800 px-4 md:px-0"
    >
      <h1 className="text-4xl font-bold text-gray-900">Find by Speciality</h1>
      <p className="sm:w-2/3 md:w-1/2 text-center text-lg text-gray-600 leading-relaxed">
        Browse through our curated list of specialities to find the right doctor for your needs,
        making your appointment scheduling effortless.
      </p>
      <div className="flex sm:justify-center gap-6 pt-10 w-full overflow-x-auto pb-6 px-2 scrollbar-hide"> {/* scrollbar-hide for cleaner scroll */}
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:scale-105 transition-all duration-300 bg-white p-6 rounded-xl shadow-md min-w-[120px] transform hover:shadow-lg"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            
            <img className="w-20 sm:w-24 mb-4 object-contain" src={item.image} alt="" />
            <p className="text-gray-800 font-semibold text-base">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;