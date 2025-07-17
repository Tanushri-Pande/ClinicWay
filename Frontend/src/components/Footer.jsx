
import { assets } from "../assets/assets";


const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white pt-16 md:pt-20 lg:pt-24 px-4 md:px-8 lg:px-16 text-gray-700">
      <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-14 md:gap-10 lg:gap-20 my-10 border-b border-blue-100 pb-10">
        {/* --------------left section (Logo & Description)-------------- */}
        <div>
          <img className="mb-5 w-40 sm:w-48 lg:w-52" src={assets.logo} alt="ClinicWay Logo" />
          <p className="w-full md:w-11/12 text-gray-600 leading-relaxed text-sm lg:text-base">
            ClinicWay: Bridging the gap between doctors and patients with
            seamless appointment management, secure prescriptions, and
            personalized healthcare solutions. Your health, our priority.
          </p>
          
        </div>

        {/* --------------center section (Company Links)-------------- */}
        <div>
          <p className="text-xl lg:text-2xl font-bold text-blue-700 mb-6">COMPANY</p>
          <ul className="flex flex-col gap-3 text-gray-600 text-base">
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">Home</li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">About us</li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">Contact us</li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">Privacy policy</li>
          </ul>
        </div>

        {/* --------------right section (Get In Touch)-------------- */}
        <div>
          <p className="text-xl lg:text-2xl font-bold text-blue-700 mb-6">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600 text-base">
            <li className="flex items-center gap-2">
              
              Tel: XXXXXXXXXX
            </li>
            <li className="flex items-center gap-2">
              
              clinicway27@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div>
        {/* -----------copy right text--------- */}
        <p className="py-6 text-sm text-center text-gray-500 font-normal">
          Copyright © Tanushri2025 - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
