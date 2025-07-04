
import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL); // test DB
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/vehicles', () => {
  it('should create a new vehicle', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({ name: 'Tata Ace', capacityKg: 500, tyres: 4 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Tata Ace');
  });
});
