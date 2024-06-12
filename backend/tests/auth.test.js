const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        role: 'child'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
