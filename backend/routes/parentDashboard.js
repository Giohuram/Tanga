const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Obtenir la progression de lecture des enfants
router.get('/:parentId/childrenProgress', async (req, res) => {
  const { parentId } = req.params;
  try {
    const children = await prisma.user.findMany({
      where: { parentId: parseInt(parentId) },
      include: { ReadingSession: true },
    });
    res.status(200).json(children);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch children progress' });
  }
});

// Ajouter un livre à la bibliothèque
router.post('/addBook', async (req, res) => {
  const { title, author, genre, ageGroup } = req.body;
  try {
    const book = await prisma.book.create({
      data: { title, author, genre, ageGroup },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add book' });
  }
});

// Supprimer un livre de la bibliothèque
router.delete('/deleteBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete book' });
  }
});

module.exports = router;
