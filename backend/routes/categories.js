const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Filtrer les livres par âge et genre
router.get('/', async (req, res) => {
  const { ageGroup, genre } = req.query;
  try {
    const books = await prisma.book.findMany({
      where: {
        AND: [
          { ageGroup: ageGroup || undefined },
          { genre: genre || undefined }
        ]
      }
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch books' });
  }
});

module.exports = router;
