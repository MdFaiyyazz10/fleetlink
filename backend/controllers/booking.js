import {Booking} from '../models/booking.js';
import {Vehicle} from '../models/vehicle.js';

import { calculateDuration } from '../utils/calculateDuration.js';

export const findAvailableVehicles = async(req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    const duration = calculateDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const allVehicles = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    const availableVehicles = [];
    const unavailableVehicles = [];

    for (const vehicle of allVehicles) {
      const isBooked = await Booking.findOne({
        vehicleId: vehicle._id,
        $or: [
          { startTime: { $lt: end }, endTime: { $gt: start } }
        ]
      });

      if (isBooked) {
        unavailableVehicles.push({
          _id: vehicle._id,
          name: vehicle.name,
          reason: "Already booked in selected time window"
        });
      } else {
        availableVehicles.push(vehicle);
      }
    }

    res.status(200).json({
      estimatedRideDurationHours: duration,
      availableVehicles,
      unavailableVehicles
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export const bookVehicle = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    const duration = calculateDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });

    const conflict = await Booking.findOne({
      vehicleId,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } }
      ]
    });

    if (conflict) {
      return res.status(409).json({ message: 'Vehicle already booked in this time slot' });
    }

    const booking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId
    });

    await booking.save();
    return res.status(201).json({message: "Booking Successfull" , booking});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
