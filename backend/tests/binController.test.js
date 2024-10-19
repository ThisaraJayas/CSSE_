// binController.test.js
import request from 'supertest';
import app from '../app'; // Your Express app
import mongoose from 'mongoose';
import Bin from '../models/Bin.js';

beforeAll(async () => {
  // Connect to the test database before running tests
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up and close the database connection after tests
  await Bin.deleteMany({});
  await mongoose.connection.close();
});

describe('Bin Controller', () => {
  let testBinId;
  const testUserId = 'validOwnerId'; // Mock user ID for tests

  // Test case for adding a bin
  it('should add a bin with valid data', async () => {
    const res = await request(app)
      .post('/bins') // Assuming your route is POST /bins
      .send({
        ownerId: testUserId,
        binType: 'Recyclable',
        location: { lat: 10.123456, lng: 20.123456 },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Bin added successfully');
    expect(res.body.bin).toHaveProperty('_id');
    testBinId = res.body.bin._id; // Save the bin ID for further tests
  });

  it('should return 400 for missing required fields when adding a bin', async () => {
    const res = await request(app).post('/bins').send({
      ownerId: testUserId,
      binType: 'Recyclable',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing required fields');
  });

  // Test case for getting user bins
  it('should get bins for a specific user', async () => {
    const res = await request(app)
      .get('/bins/userId/' + testUserId) // Adjust the route according to your API
      .set('Authorization', 'Bearer validToken'); // Include token if needed

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0); // Should have bins
  });

  it('should return 404 when no bins are found for a user', async () => {
    const res = await request(app)
      .get('/bins/userId/invalidUserId')
      .set('Authorization', 'Bearer validToken');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No bins found for this user');
  });

  // Test case for verifying a bin
  it('should verify a bin successfully', async () => {
    const res = await request(app)
      .post(`/bins/${testBinId}/verify`) // Assuming your route is POST /bins/:binId/verify
      .set('Authorization', 'Bearer validToken'); // Include token if needed

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bin verified and QR code generated');
  });

  it('should return 404 when verifying a non-existing bin', async () => {
    const res = await request(app)
      .post('/bins/invalidBinId/verify')
      .set('Authorization', 'Bearer validToken');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Bin not found');
  });

  it('should return 400 when verifying an already verified bin', async () => {
    const res = await request(app)
      .post(`/bins/${testBinId}/verify`)
      .set('Authorization', 'Bearer validToken'); // Trying to verify again

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Bin is already verified');
  });

  // Test case for getting all bins
  it('should retrieve all bins', async () => {
    const res = await request(app).get('/bins'); // Adjust route accordingly

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return 404 when no bins are available', async () => {
    // Clear all bins and test for empty database
    await Bin.deleteMany({});

    const res = await request(app).get('/bins');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No bins found');
  });

  // Test case for rejecting a bin
  it('should reject an existing bin', async () => {
    const res = await request(app).delete(`/bins/${testBinId}`); // Assuming your route is DELETE /bins/:binId

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bin rejected and removed');
  });

  it('should return 404 when trying to reject a non-existing bin', async () => {
    const res = await request(app).delete('/bins/invalidBinId');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Bin not found');
  });

  // Test case for adding weight to a bin
  it('should add weight to a bin successfully', async () => {
    const res = await request(app)
      .patch(`/bins/${testBinId}/weight`) // Assuming your route is PATCH /bins/:binId/weight
      .send({ weight: 100 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('weight', 100);
  });

  it('should return 500 when adding weight to a non-existing bin', async () => {
    const res = await request(app)
      .patch('/bins/invalidBinId/weight')
      .send({ weight: 100 });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Error adding weight to bin');
  });
});
