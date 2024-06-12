const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const annotationsRoutes = require('./routes/annotations');
const badgesRoutes = require('./routes/badges');
const categoriesRoutes = require('./routes/categories');
const offlineReadingRoutes = require('./routes/offlineReading');
const parentDashboardRoutes = require('./routes/parentDashboard');
const quizzesRoutes = require('./routes/quizzes');
const readingSessionsRoutes = require('./routes/readingSessions');
const reviewsRoutes = require('./routes/reviews');
const subscriptionRoutes = require('./routes/subscription');

app.use('/auth', authRoutes);
app.use('/annotations', annotationsRoutes);
app.use('/badges', badgesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/offlineReading', offlineReadingRoutes);
app.use('/parentDashboard', parentDashboardRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/readingSessions', readingSessionsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/subscription', subscriptionRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
