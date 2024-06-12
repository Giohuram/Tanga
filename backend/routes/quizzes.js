const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajouter un quiz
router.post('/', async (req, res) => {
  const { bookId, question, options, answer } = req.body;
  try {
    const quiz = await prisma.quiz.create({
      data: { bookId, question, options: JSON.stringify(options), answer },
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add quiz' });
  }
});

// Obtenir les quiz pour un livre
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { bookId: parseInt(bookId) },
    });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch quizzes' });
  }
});

// Soumettre les résultats du quiz
router.post('/results', async (req, res) => {
  const { userId, quizId, score } = req.body;
  try {
    const result = await prisma.quizResult.create({
      data: { userId, quizId, score },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Unable to submit quiz result' });
  }
});

// Obtenir les résultats du quiz pour un utilisateur
router.get('/results/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const results = await prisma.quizResult.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json(results);
  } catch (error) {
    res.status (400).json({ error: 'Unable to fetch quiz results' });
  }
});

module.exports = router;
