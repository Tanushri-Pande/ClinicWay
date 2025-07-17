# 🏥 ClinicWay - Doctor Appointment Booking System

ClinicWay is a full-stack web application for seamless online doctor appointment booking. It supports **patient registration**, **doctor management**, **admin dashboard**, **appointment scheduling**, and **online payments via Razorpay**.

> 🌐 Live Demo (if deployed):  
> - Admin Panel: https://admin-clinicway.onrender.com  
> - Client Frontend: https://clinicway-client.onrender.com  
> - Backend API: https://clinicway-backend.onrender.com/api

---

## 📁 Project Structure

clinicway/
├── admin-frontend/ # Admin dashboard (React)
├── client-frontend/ # Patient-facing website (React)
└── backend/ # RESTful API (Node.js + Express   +MongoDB)


---

## 🔧 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS / Bootstrap
- Razorpay Integration
- Cloudinary (Admin image uploads)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Multer for file uploads
- Cloudinary for media storage
- Razorpay Payment Gateway

---

## 🔐 User Roles

- **Admin**: Add/manage doctors, cancel appointments, view analytics.
- **Patient**: Register, login, book appointments, make payments, manage profile.
- **Doctor**: (optional extension) Login, set availability, view bookings.

---


💳 Razorpay Integration
Client triggers payment using Razorpay popup.

Backend validates and confirms payment before appointment is saved.

📦 Deployment
All services are deployed on Render.

Use render.yaml or deploy manually.

Ensure environment variables are set in each Render service.



✍️ Author
Tanushri Pande
