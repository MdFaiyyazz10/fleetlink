import express from 'express';
import { findAvailableVehicles, bookVehicle } from '../controllers/booking.js';

const router = express.Router();

router.get('/vehicles/available', findAvailableVehicles);
router.post('/bookings', bookVehicle);

export default router;
