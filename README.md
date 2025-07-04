# 🚚 FleetLink - Logistics Vehicle Booking System

FleetLink is a full-stack web application built to manage and book logistics vehicles for B2B clients. It allows users to:

- Add vehicles
- Search for available vehicles based on capacity, route, and time
- Book vehicles while preventing time conflicts

Built with a Node.js backend, React frontend, and MongoDB database.

---

## 📸 Demo & Proof

### 🔗 Video Walkthrough  
[▶️ Watch FleetLink Demo](https://drive.google.com/file/d/1AKDVid0UJJk_pE_XfNQCN-64w7DyieVm/view?usp=sharing)

### 🖼️ Screenshots  
- [Database](https://drive.google.com/file/d/1YEMhfSkbegVzgdsN5q43nlxUiIminvJx/view?usp=sharing)  
- [Avalaible Booking](https://drive.google.com/file/d/1reZenHULRb5xjoQadT1m51qmAOPUjVkr/view?usp=sharing)  

---

## 📌 Features

### ✅ Backend
- Add vehicles with capacity and tyre info
- Search vehicles based on capacity, route (pincodes), and time
- Calculate ride duration using pincode distance
- Filter out vehicles with overlapping bookings
- Create bookings with conflict detection

### ✅ Frontend
- Built with React and Material-UI (MUI)
- Add Vehicle form
- Search & Book Vehicle UI
- Feedback on success/error actions

---

## ⚙️ Tech Stack

| Layer       | Tech              |
|-------------|-------------------|
| Frontend    | React, Material-UI |
| Backend     | Node.js, Express   |
| Database    | MongoDB, Mongoose  |
| Testing     | Jest               |

---

## 🚀 Getting Started

### 1. Clone the repo


git clone https://github.com/MdFaiyyazz10/fleetlink.git
cd fleetlink



2. Setup backend

cd backend
npm install
Environment Variables
Create a .env file inside backend:

PORT=4000
MONGO_URL=mongodb://localhost:27017/fleetlink


3. Start backend server

npm run dev


4. Setup frontend

cd ../frontend
npm install
npm run dev




**📦 API Endpoints**
▶️ POST /api/vehicles
Add a new vehicle

▶️ GET /api/vehicles/available

Search available vehicles
Query Parameters:

?capacityRequired=500&fromPincode=400001&toPincode=400021&startTime=2023-07-03T10:00:00Z

▶️ POST /api/bookings
Create a booking
Body:

json
{
  "vehicleId": "64a87f3...",
  "fromPincode": "400001",
  "toPincode": "400021",
  "startTime": "2023-07-03T10:00:00Z",
  "customerId": "CUST123"
}



🛠️ Future Improvements (Optional)
Cancel bookings (DELETE /api/bookings/:id)

Booking history for each customer

Improved UX with routing and loading spinners

Dockerization with docker-compose

