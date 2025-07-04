import {Vehicle} from '../models/vehicle.js';

export const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;

    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const vehicle = new Vehicle({ name, capacityKg, tyres });
    await vehicle.save();

    return res.status(201).json({message: "Vehicle Added",vehicle});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}



export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }) 
    res.status(200).json(vehicles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}