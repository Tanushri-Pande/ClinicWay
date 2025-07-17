import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets"; 
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment, 
    cancelAppointment, 
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="mx-auto p-4 md:p-6 lg:p-8 font-sans w-full max-w-6xl">
        <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">Doctor Dashboard</h1>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="p-3 bg-blue-100 rounded-full">
              <img className="w-10 h-10 object-contain" src={assets.earning_icon} alt="Earnings Icon" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {currency} {dashData.earnings.toFixed(2)} {/* Format earnings to 2 decimal places */}
              </p>
              <p className="text-gray-600 mt-1 text-lg">Total Earnings</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="p-3 bg-green-100 rounded-full">
              <img className="w-10 h-10 object-contain" src={assets.appointments_icon} alt="Appointments Icon" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-gray-600 mt-1 text-lg">Total Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="p-3 bg-purple-100 rounded-full">
              <img className="w-10 h-10 object-contain" src={assets.patients_icon} alt="Patients Icon" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-gray-600 mt-1 text-lg">Total Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 px-6 py-4 bg-blue-50 rounded-t-xl border-b border-blue-200">
            <img className="w-6 h-6 object-contain" src={assets.list_icon} alt="List Icon" />
            <p className="font-semibold text-lg text-gray-800">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-100 p-2">
            {dashData.latestAppointments.length === 0 ? (
              <p className="text-center text-gray-600 py-8 text-md">No recent bookings.</p>
            ) : (
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 hover:bg-gray-50"
                  key={item._id} // Use item._id as key
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <img
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                      src={item.userData.image}
                      alt="Patient Profile"
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-medium">{item.userData.name}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    {item.cancelled ? (
                      <span className="text-red-500 font-semibold px-3 py-1 bg-red-50 rounded-full text-xs">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="text-green-600 font-semibold px-3 py-1 bg-green-50 rounded-full text-xs">Completed</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                          title="Cancel Appointment"
                        >
                          <img
                            className="w-7 h-7 object-contain"
                            src={assets.cancel_icon}
                            alt="Cancel"
                          />
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                          title="Complete Appointment"
                        >
                          <img
                            className="w-7 h-7 object-contain"
                            src={assets.tick_icon}
                            alt="Complete"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;