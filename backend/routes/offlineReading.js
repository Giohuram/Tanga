const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Télécharger un ebook
router.get('/download/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (book.ebookUrl) {
      res.redirect(book.ebookUrl);
    } else {
      res.status(404).json({ error: 'Ebook not available' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to download ebook' });
  }
});

module.exports = router;
