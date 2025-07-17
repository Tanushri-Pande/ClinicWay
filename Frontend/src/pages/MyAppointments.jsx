
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MoveUpOnRender from "../components/MoveUpOnRender";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dataArray = slotDate.split("_");
    return (
      dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return; // Prevent accidental cancellations
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData(); // Refresh doctor slots
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
    }
  };

  // handle razorpay payment
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success("Payment successful!");
            getUserAppointments();
            // navigate("/my-appointments"); // Already on this page, no need to navigate
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.log("error:", error);
          toast.error(error.message);
        }
      },
      prefill: {
        
      },
      theme: {
        color: "#3B82F6" 
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('razorpay.payment.failed', function (response){
      toast.error("Payment failed: " + response.error.description);
    });
    rzp.open();
  };

  // handle razorpay payment
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data?.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
    }
  };

  //handle navigation
  const handleNavigation = (docId) => {
    navigate(`/appointment/${docId}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-0">
      <p className="pb-3 mt-12 mb-8 text-2xl md:text-3xl font-bold text-blue-800 border-b-2 border-blue-200">
        My Appointments
      </p>

      <MoveUpOnRender id="my-appointments-list">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">You have no appointments yet.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-100"
              key={item._id || index} // Use _id as key if available
            >
              {/* Doctor Image - Clickable */}
              <div 
                onClick={() => handleNavigation(item?.docData?._id)}
                className="cursor-pointer flex-shrink-0"
              >
                <img
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border border-blue-100 shadow-sm"
                  src={item?.docData?.image}
                  alt={item?.docData?.name}
                />
              </div>

              {/* Doctor Info */}
              <div 
                onClick={() => handleNavigation(item?.docData?._id)}
                className="flex-1 text-sm text-zinc-500 cursor-pointer"
              >
                <p className="text-neutral-800 font-bold text-lg mb-1">
                  Dr. {item?.docData?.name}
                </p>
                <p className="text-blue-600 font-medium mb-2">
                  {item?.docData?.speciality}
                </p>
                <p className="text-zinc-700 font-semibold mt-1">Address:</p>
                <p className="text-xs text-gray-600">{item?.docData?.address?.line1}</p>
                <p className="text-xs text-gray-600">{item?.docData?.address?.line2 || item?.docData?.address?.line1}</p>
                <p className="text-xs mt-2">
                  <span className="text-sm text-blue-700 font-bold">
                    Date & Time :
                  </span>{" "}
                  <span className="text-gray-800 font-semibold">
                    {slotDateFormat(item?.slotDate)} | {item.slotTime}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 justify-end w-full sm:w-auto sm:ml-auto">
                {/* Paid Status */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="text-sm text-green-700 text-center py-2 px-4 rounded-md border border-green-300 bg-green-50 font-semibold cursor-default sm:min-w-[150px]">
                    Paid
                  </button>
                )}
                {/* Pay Online */}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item?._id)}
                    className="text-sm text-white text-center py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-semibold sm:min-w-[150px]"
                  >
                    Pay Online
                  </button>
                )}
                {/* Cancel Appointment */}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-white text-center py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 transition-colors duration-300 font-semibold sm:min-w-[150px]"
                  >
                    Cancel Appointment
                  </button>
                )}

                {/* Appointment Cancelled Status */}
                {item.cancelled && !item.isCompleted && (
                  <button className="text-sm text-red-600 text-center py-2 px-4 rounded-md border border-red-400 bg-red-50 font-semibold cursor-default sm:min-w-[150px]">
                    Appointment Cancelled
                  </button>
                )}
                {/* Completed Status */}
                {item.isCompleted && (
                  <button className="text-sm text-white text-center py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 transition-colors duration-300 font-semibold sm:min-w-[150px]">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </MoveUpOnRender>
    </div>
  );
};

export default MyAppointments;