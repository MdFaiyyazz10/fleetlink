import express from 'express';
import { addVehicle, getAllVehicles } from '../controllers/vehicles.js';

const router = express.Router();

router.post('/vehicles', addVehicle);

router.get('/all-vehicle', getAllVehicles);

export default router;
