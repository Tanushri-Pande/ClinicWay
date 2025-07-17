       
import { assets } from "../assets/assets";
import MoveUpOnRender from "../components/MoveUpOnRender";

const About = () => {
  return (
    <MoveUpOnRender id="about">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
        {/* Page Title */}
        <div className="text-center mb-10">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
            About <span className="text-blue-600">US</span>
          </p>
          <div className="w-20 h-1 bg-blue-200 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* ---------top section (Image & Description)---------*/}
        <div className="my-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-shrink-0 w-full md:w-auto md:max-w-[450px]">
            <img
              className="w-full h-auto rounded-lg shadow-xl object-cover transform hover:scale-[1.01] transition-transform duration-300"
              src={assets.about_image}
              alt="About Us"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 text-base text-gray-700 leading-relaxed">
            <p>
              Welcome to ClinicWay, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At ClinicWay, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p>
              ClinicWay is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, ClinicWay is here to support you every
              step of the way.
            </p>
            <b className="font-bold text-2xl text-blue-700 mt-2">Our Vision</b>
            <p>
              Our vision at ClinicWay is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>

        {/* "Why Choose Us" Section */}
        <div className="mt-20 mb-20"> 
          <div className="text-center mb-10">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              Why <span className="text-blue-600">Choose Us</span>
            </p>
            <div className="w-20 h-1 bg-blue-200 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 text-base">
            {/* Efficiency Card */}
            <div className="bg-white border-2 border-blue-200 rounded-lg shadow-md px-6 py-10 flex flex-col gap-4 text-gray-700 cursor-pointer flex-1
                            hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <b className="text-xl font-bold text-blue-700 hover:text-white transition-colors duration-300">Efficiency:</b>
              <p>
                Streamlined appointment scheduling that fits into your busy
                lifestyle.
              </p>
            </div>
            {/* Convenience Card */}
            <div className="bg-white border-2 border-blue-200 rounded-lg shadow-md px-6 py-10 flex flex-col gap-4 text-gray-700 cursor-pointer flex-1
                            hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <b className="text-xl font-bold text-blue-700 hover:text-white transition-colors duration-300">Convenience:</b>
              <p>
                Access to a network of trusted healthcare professionals in your
                area.
              </p>
            </div>
            {/* Personalization Card */}
            <div className="bg-white border-2 border-blue-200 rounded-lg shadow-md px-6 py-10 flex flex-col gap-4 text-gray-700 cursor-pointer flex-1
                            hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <b className="text-xl font-bold text-blue-700 hover:text-white transition-colors duration-300">Personalization:</b>
              <p>
                Tailored recommendations and reminders to help you stay on top
                of your health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MoveUpOnRender>
  );
};

export default About;