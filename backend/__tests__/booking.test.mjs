import request from 'supertest';
import app from '../app.js'; 
import mongoose from 'mongoose';
import Vehicle from '../models/vehicle.model.js';
import Booking from '../models/booking.model.js';

describe('POST /api/bookings', () => {
  let vehicle;

  beforeAll(async () => {
   
    await mongoose.connect('mongodb://127.0.0.1:27017/fleetlink_test');
  });

  beforeEach(async () => {
    // Clear test DB before each test
    await Vehicle.deleteMany();
    await Booking.deleteMany();

    // Add one vehicle
    vehicle = await Vehicle.create({
      name: 'Test Truck',
      capacityKg: 1000,
      tyres: 6
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a booking successfully when no conflict', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId: vehicle._id.toString(),
        fromPincode: '110001',
        toPincode: '110021',
        startTime: '2025-07-04T10:00:00Z',
        customerId: 'customer123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.vehicleId).toBe(vehicle._id.toString());
  });

  it('should return 409 Conflict when vehicle is already booked in the same time slot', async () => {
    // First booking
    await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: '110001',
      toPincode: '110021',
      startTime: new Date('2025-07-04T10:00:00Z'),
      endTime: new Date('2025-07-04T12:00:00Z'), // 2 hours duration
      customerId: 'existingCustomer'
    });

    // Second booking with overlapping time
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId: vehicle._id.toString(),
        fromPincode: '110005',
        toPincode: '110020',
        startTime: '2025-07-04T11:00:00Z',
        customerId: 'newCustomer'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/already booked/i);
  });
});
