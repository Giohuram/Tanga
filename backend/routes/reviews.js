const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajouter un avis
router.post('/', async (req, res) => {
  const { userId, bookId, content, rating } = req.body;
  try {
    const review = await prisma.review.create({
      data: { userId, bookId, content, rating },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add review' });
  }
});

// Obtenir les avis pour un livre
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { bookId: parseInt(bookId) },
      include: { user: true }
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch reviews' });
  }
});

module.exports = router;
