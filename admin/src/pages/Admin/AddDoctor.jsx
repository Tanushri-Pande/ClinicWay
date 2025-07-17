import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, SetDocImg] = useState(false);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [experience, SetExperience] = useState("1 Year");
  const [fees, SetFees] = useState("");
  const [about, SetAbout] = useState("");
  const [speciality, SetSpeciality] = useState("General physician");
  const [degree, SetDegree] = useState("");
  const [address1, SetAddress1] = useState("");
  const [address2, SetAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Doctor image is required."); 
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Clear form fields after successful submission
        SetDocImg(false);
        SetName("");
        SetEmail("");
        SetPassword("");
        SetFees("");
        SetAbout("");
        SetDegree("");
        SetAddress1("");
        SetAddress2("");
        SetExperience("1 Year"); // Reset to default
        SetSpeciality("General physician"); // Reset to default
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again."); // Generic error message for unexpected issues
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="mx-auto p-4 md:p-6 lg:p-8 font-sans w-full max-w-6xl">
      <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">Add New Doctor</h1> 
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 lg:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar"> 
        {/* Image Upload Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-gray-100">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-200 group-hover:border-blue-400 transition-colors duration-300 shadow-md"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor Profile"
            />
            {!docImg && ( // Show camera icon when no image is selected
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img src={assets.camera_icon} alt="Upload" className="w-8 h-8 filter invert" /> {/* Assuming you have a camera icon */}
              </div>
            )}
          </label>
          <input
            onChange={(e) => SetDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*" // Restrict to image files
          />
          <p className="text-gray-700 text-lg font-medium">
            Upload Doctor <br className="hidden sm:inline" /> Picture
          </p>
        </div>

        {/* Form Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-gray-700"> {/* Responsive grid for inputs */}
          {/* Doctor Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">Doctor Name</label>
            <input
              onChange={(e) => SetName(e.target.value)}
              value={name}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="text"
              id="name"
              placeholder="e.g., Dr. Jane Doe"
              required
            />
          </div>

          {/* Doctor Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Doctor Email</label>
            <input
              onChange={(e) => SetEmail(e.target.value)}
              value={email}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="email"
              id="email"
              placeholder="e.g., jane.doe@clinic.com"
              required
            />
          </div>

          {/* Doctor Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">Doctor Password</label>
            <input
              onChange={(e) => SetPassword(e.target.value)}
              value={password}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="password"
              id="password"
              placeholder="Strong password"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-2">
            <label htmlFor="experience" className="font-medium">Experience (Years)</label>
            <select
              onChange={(e) => SetExperience(e.target.value)}
              value={experience}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base appearance-none bg-white pr-8"
              id="experience"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                <option key={year} value={`${year} Year${year > 1 ? 's' : ''}`}>{year} Year{year > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fees" className="font-medium">Consultation Fees</label>
            <input
              onChange={(e) => SetFees(e.target.value)}
              value={fees}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="number"
              id="fees"
              placeholder="e.g., 500"
              required
            />
          </div>

          {/* Speciality */}
          <div className="flex flex-col gap-2">
            <label htmlFor="speciality" className="font-medium">Speciality</label>
            <select
              onChange={(e) => SetSpeciality(e.target.value)}
              value={speciality}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base appearance-none bg-white pr-8"
              id="speciality"
            >
              <option value="General physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Endocrinologist">Endocrinologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Oncologist">Oncologist</option>
              <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Urologist">Urologist</option>
              
            </select>
          </div>

          {/* Education/Degree */}
          <div className="flex flex-col gap-2">
            <label htmlFor="degree" className="font-medium">Education / Degree</label>
            <input
              onChange={(e) => SetDegree(e.target.value)}
              value={degree}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="text"
              id="degree"
              placeholder="e.g., MBBS, MD"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 col-span-1 md:col-span-2"> 
            <label htmlFor="address1" className="font-medium">Clinic Address</label>
            <input
              onChange={(e) => SetAddress1(e.target.value)}
              value={address1}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="text"
              id="address1"
              placeholder="Address Line 1"
              required
            />
            <input
              onChange={(e) => SetAddress2(e.target.value)}
              value={address2}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
              type="text"
              id="address2"
              placeholder="Address Line 2 (Optional)"
            />
          </div>
        </div>

        {/* About Doctor */}
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="about" className="font-medium">About Doctor</label>
          <textarea
            onChange={(e) => SetAbout(e.target.value)}
            value={about}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base min-h-[120px]"
            id="about"
            placeholder="Write a brief description about the doctor, their approach, and experience..."
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
