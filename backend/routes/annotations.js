const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajouter une note
router.post('/notes', async (req, res) => {
  const { userId, bookId, content } = req.body;
  try {
    const note = await prisma.note.create({
      data: { userId, bookId, content },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add note' });
  }
});

// Modifier une note
router.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const note = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { content },
    });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update note' });
  }
});

// Supprimer une note
router.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.note.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete note' });
  }
});

// Ajouter un surlignage
router.post('/highlights', async (req, res) => {
  const { userId, bookId, text } = req.body;
  try {
    const highlight = await prisma.highlight.create({
      data: { userId, bookId, text },
    });
    res.status(201).json(highlight);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add highlight' });
  }
});

// Modifier un surlignage
router.put('/highlights/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const highlight = await prisma.highlight.update({
      where: { id: parseInt(id) },
      data: { text },
    });
    res.status(200).json(highlight);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update highlight' });
  }
});

// Supprimer un surlignage
router.delete('/highlights/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.highlight.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete highlight' });
  }
});

module.exports = router;
