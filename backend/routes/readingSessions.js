const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Mettre à jour la progression de lecture
router.put('/:id/progress', async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  try {
    const session = await prisma.readingSession.update({
      where: { id: parseInt(id) },
      data: { progress },
    });
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update reading progress' });
  }
});

// Obtenir la progression de lecture
router.get('/:userId/:bookId', async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const session = await prisma.readingSession.findFirst({
      where: { userId: parseInt(userId), bookId: parseInt(bookId) },
    });
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch reading progress' });
  }
});

module.exports = router;
