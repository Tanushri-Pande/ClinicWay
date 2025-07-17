

import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets"; // Ensure assets has upload_icon
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import MoveUpOnRender from "../components/MoveUpOnRender"; // Assuming this is a utility component

const MyProfile = () => {
  const { backendUrl, token, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState(false); // Stores File object for new image
  const [initialUserData, setInitialUserData] = useState(null); // To store original data for reset

  useEffect(() => {
    if (userData) {
      setInitialUserData(userData); // Save initial data when userData loads
    }
  }, [userData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("Image size should be less than 2MB.");
        setImage(false);
        return;
      }
      setImage(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const cancelEdit = () => {
    setEdit(false);
    setImage(false); // Clear any pending image selection
    if (initialUserData) {
      setUserData(initialUserData); // Revert to initial data
    }
  };


  const updateUserProfileData = async () => {
    if (!userData) {
      toast.error("User data not loaded.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        loadUserProfileData(); // Re-fetch updated profile data
        setEdit(false);
        setImage(false); // Clear image state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile. Please try again.");
    }
  };

  return (
    userData && (
      <MoveUpOnRender id="my-profile">
        <div className="mx-auto p-4 md:p-6 lg:p-8 font-sans w-full max-w-2xl">
          <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">My Profile</h1>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 text-sm">
            {/* Profile Image Section */}
            <div className="mb-8 flex flex-col items-center">
              {isEdit ? (
                <label htmlFor="imageUpload" className="relative cursor-pointer group">
                  <img
                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 shadow-md transition-opacity duration-300 opacity-80 group-hover:opacity-60"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img
                      className="w-12 h-12 object-contain"
                      src={assets.upload_icon}
                      alt="Upload Icon"
                    />
                  </div>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    id="imageUpload"
                    hidden
                    accept="image/*"
                  />
                </label>
              ) : (
                <img
                  className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 shadow-md"
                  src={userData.image}
                  alt="Profile"
                />
              )}
            </div>

            {/* Name Section */}
            <div className="mb-8 text-center">
              {isEdit ? (
                <input
                  className="text-4xl font-bold text-gray-800 border-b-2 border-blue-300 bg-transparent px-2 py-1 text-center focus:outline-none focus:border-blue-500 capitalize w-full max-w-xs mx-auto"
                  value={userData.name}
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                />
              ) : (
                <p className="font-bold text-4xl text-gray-800 capitalize">
                  {userData.name}
                </p>
              )}
            </div>

            <hr className="my-6 border-t-2 border-gray-100" />

            {/* Contact Information */}
            <div className="mb-8">
              <p className="text-gray-500 font-semibold uppercase text-md mb-4 border-b-2 border-blue-100 pb-2">
                Contact Information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-y-4 gap-x-6 text-gray-700">
                <p className="font-medium text-gray-800">Email id:</p>
                <p className="text-blue-600">{userData.email}</p>

                <p className="font-medium text-gray-800">Phone:</p>
                {isEdit ? (
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full md:max-w-xs"
                    value={userData.phone}
                    type="text"
                    name="phone"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-600">{userData.phone}</p>
                )}

                <p className="font-medium text-gray-800">Address:</p>
                {isEdit ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      value={userData.address?.line1 || ''}
                      type="text"
                      name="line1"
                      onChange={handleInputChange}
                      placeholder="Address Line 1"
                    />
                    <input
                      className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      value={userData.address?.line2 || ''}
                      type="text"
                      name="line2"
                      onChange={handleInputChange}
                      placeholder="Address Line 2 (Optional)"
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {userData.address.line1}
                    {userData.address.line2 && <><br />{userData.address.line2}</>}
                  </p>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <p className="text-gray-500 font-semibold uppercase text-md mb-4 border-b-2 border-blue-100 pb-2">
                Basic Information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-y-4 gap-x-6 text-gray-700">
                <p className="font-medium text-gray-800">Gender:</p>
                {isEdit ? (
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full md:max-w-[120px]"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    value={userData.gender}
                    name="gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option> 
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-600 capitalize">{userData.gender}</p>
                )}

                <p className="font-medium text-gray-800">Birthday:</p>
                {isEdit ? (
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full md:max-w-[180px]"
                    type="date"
                    value={userData.dob}
                    name="dob"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-600"> {userData.dob}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex gap-4 justify-center">
              {isEdit ? (
                <>
                  <button
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={updateUserProfileData}
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </MoveUpOnRender>
    )
  );
};

export default MyProfile;
