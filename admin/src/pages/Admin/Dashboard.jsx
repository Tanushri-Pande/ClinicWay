import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="mx-auto p-4 md:p-6 lg:p-8 font-sans"> {/* Centered content, consistent padding */}
        <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">Admin Dashboard</h1> {/* Added a clear title */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"> {/* Responsive grid layout */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"> {/* Enhanced card styles */}
            <img className="w-16 h-16 object-contain" src={assets.doctor_icon} alt="Doctors Icon" /> {/* Increased icon size */}
            <div>
              <p className="text-3xl font-bold text-blue-600"> {/* Bolder, blue count */}
                {dashData.doctors}
              </p>
              <p className="text-gray-600 text-lg">Doctors</p> {/* Larger label */}
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-16 h-16 object-contain" src={assets.appointments_icon} alt="Appointments Icon" />
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-600 text-lg">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-16 h-16 object-contain" src={assets.patients_icon} alt="Patients Icon" />
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {dashData.patients}
              </p>
              <p className="text-gray-600 text-lg">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"> {/* Container for latest bookings */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-blue-50 rounded-t-xl"> {/* Header for latest bookings */}
            <img className="w-6 h-6 object-contain" src={assets.list_icon} alt="List Icon" /> {/* Sized icon */}
            <p className="font-semibold text-lg text-gray-800">Latest Bookings</p> {/* Larger, bolder text */}
          </div>

          <div className="p-4"> 
            {dashData.latestAppointments.length === 0 ? (
              <div className="p-6 text-center text-gray-600">No recent bookings.</div>
            ) : (
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 ease-in-out border-b border-gray-100 last:border-b-0"
                  key={index}
                >
                  <img
                    className="rounded-full w-12 h-12 object-cover border border-gray-200"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div className="flex-1 text-base"> 
                    <p className="text-gray-900 font-medium">{item.docData.name}</p>
                    <p className="text-gray-600 text-sm">{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                  </div>
                  {item.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Completed</span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 group"
                      title="Cancel Appointment"
                    >
                      <img
                        className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-200"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;