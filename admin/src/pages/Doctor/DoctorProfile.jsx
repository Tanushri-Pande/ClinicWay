import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets"; 

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: Number(profileData.fees), 
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData(); // Re-fetch updated profile data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (dToken) { // Only fetch if token exists
      getProfileData();
    }
  }, [dToken]); // Dependency array includes dToken

  return (
    profileData && ( // Only render if profileData is available
      <div className="mx-auto p-4 md:p-6 lg:p-8 font-sans w-full max-w-4xl">
        <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">Doctor Profile</h1>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col items-center">
          {/* Doctor Image */}
          <div className="mb-6">
            <img
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-200 shadow-md"
              src={profileData.image}
              alt="Doctor Profile Picture"
            />
          </div>

          {/* Doctor Info: name, degree, speciality, experience */}
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-gray-800 mb-1">
              {profileData.name}
            </p>
            <p className="text-xl text-gray-700">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="inline-block mt-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-200">
              {profileData.experience}
            </span>
          </div>

          {/* Doctor About */}
          <div className="w-full text-center mb-6 px-4 md:px-8">
            <p className="text-lg font-semibold text-gray-800 mb-2">About:</p>
            <p className="text-base text-gray-600 leading-relaxed">
              {profileData.about}
            </p>
          </div>

          {/* Editable Fields */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-gray-100 pt-6 mt-6 text-gray-700">
            {/* Appointment Fee */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="font-semibold text-lg">Appointment Fee:</p>
              {isEdit ? (
                <div className="flex items-center gap-1">
                  <span className="text-gray-800 font-semibold text-lg">{currency}</span>
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-32"
                  />
                </div>
              ) : (
                <p className="text-gray-800 font-semibold text-lg">
                  {currency} {profileData.fees}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
              <p className="font-semibold text-lg">Clinic Address:</p>
              {isEdit ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Address Line 2"
                  />
                </div>
              ) : (
                <p className="text-base text-gray-600">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 col-span-1 sm:col-span-2 mt-4">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                id="availableToggle"
                className="w-5 h-5 accent-blue-600 cursor-pointer"
                disabled={!isEdit} // Disable checkbox if not in edit mode
              />
              <label htmlFor="availableToggle" className="text-lg font-semibold text-gray-800 cursor-pointer">
                Available for Appointments
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
