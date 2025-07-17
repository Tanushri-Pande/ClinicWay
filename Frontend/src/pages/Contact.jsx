import { assets } from "../assets/assets";
import MoveUpOnRender from "../components/MoveUpOnRender";

const Contact = () => {
  return (
    <MoveUpOnRender id="contact">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
        {/* Page Title */}
        <div className="text-center mb-10">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
            CONTACT <span className="text-blue-600">US</span>
          </p>
          <div className="w-20 h-1 bg-blue-200 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="my-10 flex flex-col justify-center md:flex-row items-center gap-10 md:gap-16 mb-28 text-base">
          {/* Contact Image */}
          <div className="flex-shrink-0 w-full md:w-auto md:max-w-[400px]">
            <img
              className="w-full h-auto rounded-lg shadow-xl object-cover transform hover:scale-[1.01] transition-transform duration-300"
              src={assets.contact_image}
              alt="Contact Us"
            />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center items-start gap-6 bg-white p-6 rounded-lg shadow-lg">
            <p className="font-bold text-2xl text-blue-700 ">Our OFFICE</p>
            <p className="text-gray-700 leading-relaxed">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p className="text-gray-700 leading-relaxed">
              Tel: (XXX) 555‑1111 <br /> Email: clinicway@gmail.com 
            </p>
            
          </div>
        </div>
      </div>
    </MoveUpOnRender>
  );
};

export default Contact;