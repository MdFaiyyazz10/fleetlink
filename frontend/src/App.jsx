import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVehiclePage from './pages/AddVehicle';
import SearchBookPage from './pages/SearchBook';
import BookingForm from './pages/BookingForm';
import Navbar from './components/Navbar';
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchBookPage />} />
        <Route path="/add-vehicle" element={<AddVehiclePage />} />
        <Route path="/booking-form" element={<BookingForm />} />


      </Routes>
        <Toaster />
    </Router>
  );
};

export default App;


export const backend = 'http://localhost:4000/api/v1'