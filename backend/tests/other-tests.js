const request = require('supertest');
const express = require('express');
const annotationsRoutes = require('../routes/annotations');
const badgesRoutes = require('../routes/badges');
const categoriesRoutes = require('../routes/categories');
const offlineReadingRoutes = require('../routes/offlineReading');
const parentDashboardRoutes = require('../routes/parentDashboard');
const quizzesRoutes = require('../routes/quizzes');
const readingSessionsRoutes = require('../routes/readingSessions');
const reviewsRoutes = require('../routes/reviews');
const subscriptionRoutes = require('../routes/subscription');
const app = express();

app.use(express.json());
app.use('/annotations', annotationsRoutes);
app.use('/badges', badgesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/offlineReading', offlineReadingRoutes);
app.use('/parentDashboard', parentDashboardRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/readingSessions', readingSessionsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/subscription', subscriptionRoutes);

describe('Other Routes', () => {
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/annotations/notes')
      .send({
        userId: 1,
        bookId: 1,
        content: 'This is a test note'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('content', 'This is a test note');
  });

  it('should fetch books by category', async () => {
    const res = await request(app)
      .get('/categories')
      .query({ ageGroup: '8-10', genre: 'Adventure' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Ajoutez d'autres tests pour les différentes routes
});
