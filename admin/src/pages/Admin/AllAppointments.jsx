import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 font-sans"> {/* Added mx-auto for centering, increased padding */}
      <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">All Appointments</h1> {/* Larger, bolder title */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"> {/* Enhanced container style */}
        <div className="max-h-[80vh] min-h-[60vh] overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar for consistent scrollbar appearance */}
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2.5fr_2.5fr_1fr_1fr] bg-blue-50 text-gray-700 font-semibold py-4 px-6 border-b border-gray-200 sticky top-0 z-10"> {/* Improved header styling, sticky */}
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Status / Actions</p> {/* Combined for clarity */}
          </div>

          {/* Appointments List */}
          {appointments.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No appointments found.</div>
          ) : (
            appointments.map((item, index) => (
              <div
                className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center text-gray-700 py-4 px-6 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-200 ease-in-out gap-y-3 sm:gap-y-0"
                key={index}
              >
                {/* # */}
                <p className="hidden sm:block">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                </div>

                {/* Age (hidden on small screens, label for mobile) */}
                <p className="sm:hidden text-gray-500 text-xs">Age: <span className="text-gray-700 text-sm font-medium">{calculateAge(item.userData.dob)}</span></p>
                <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

                {/* Date & Time */}
                <p className="w-full sm:w-auto text-gray-600">
                  <span className="sm:hidden text-gray-500 text-xs block mb-1">Date & Time:</span>
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                {/* Doctor */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                </div>

                {/* Fees */}
                <p className="w-full sm:w-auto text-gray-600">
                   <span className="sm:hidden text-gray-500 text-xs block mb-1">Fees:</span>
                   <span className="font-semibold text-gray-800">{currency}{item.amount}</span>
                </p>

                {/* Status / Actions */}
                <div className="w-full sm:w-auto flex items-center justify-end sm:justify-center">
                  {item.cancelled ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses('Cancelled')}`}>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses('Completed')}`}>
                      Completed
                    </span>
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
