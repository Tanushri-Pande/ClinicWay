import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets"; 

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="mx-auto p-4 md:p-6 lg:p-8 font-sans w-full max-w-6xl">
      <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">All Appointments</h1>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 max-h-[80vh] min-h-[50vh] overflow-y-auto custom-scrollbar">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-600 py-10 text-lg">No appointments booked yet.</p>
        ) : (
          <>
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-4 px-6 bg-blue-50 rounded-t-lg text-gray-800 font-semibold text-sm border-b border-blue-200">
              <p>#</p>
              <p>Patient</p>
              <p>Payment</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Fees</p>
              <p>Action</p>
            </div>

            {/* Appointment List */}
            <div className="divide-y divide-gray-100">
              {appointments.reverse().map((item, index) => (
                <div
                  className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center py-4 px-6 text-gray-700 text-sm md:text-base transition-colors duration-200 hover:bg-gray-50"
                  key={item._id} 
                >
                  {/* For small screens, display labels for clarity */}
                  <p className="sm:hidden font-medium text-gray-800 self-start">Appointment {index + 1}</p>

                  <p className="hidden sm:block">{index + 1}</p> {/* Index for larger screens */}

                  {/* Patient Info */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                      src={item.userData.image}
                      alt="Patient Profile"
                    />{" "}
                    <p className="font-medium text-gray-800">{item.userData.name}</p>
                  </div>

                  {/* Payment Status */}
                  <div className="w-full sm:w-auto flex items-center sm:block">
                    <span className="font-semibold text-gray-600 sm:hidden mr-2">Payment:</span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.payment
                          ? "bg-green-100 text-green-700" // Online
                          : "bg-blue-100 text-blue-700" // Cash
                      }`}
                    >
                      {item.payment ? "Online" : "Cash"}
                    </span>
                  </div>

                  {/* Age (Hidden on small screens) */}
                  <p className="hidden sm:block">
                    <span className="font-semibold text-gray-600 sm:hidden mr-2">Age:</span>
                    {calculateAge(item.userData.dob)}
                  </p>

                  {/* Date & Time */}
                  <p className="w-full sm:w-auto flex items-center sm:block">
                    <span className="font-semibold text-gray-600 sm:hidden mr-2">Time:</span>
                    <span className="font-medium text-gray-800">
                      {slotDateFormat(item.slotDate)}
                    </span>
                    , {item.slotTime}
                  </p>

                  {/* Fees */}
                  <p className="w-full sm:w-auto flex items-center sm:block">
                    <span className="font-semibold text-gray-600 sm:hidden mr-2">Fees:</span>
                    <span className="font-medium text-gray-800">
                      {currency} {item.amount}
                    </span>
                  </p>

                  {/* Action/Status */}
                  <div className="w-full sm:w-auto flex items-center justify-end sm:justify-start gap-3 mt-4 sm:mt-0">
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;