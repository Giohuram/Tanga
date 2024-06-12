const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// S'abonner
router.post('/subscribe', async (req, res) => {
  const { userId, subscription } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { subscription },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to subscribe' });
  }
});

// Annuler l'abonnement
router.post('/unsubscribe', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { subscription: null },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to unsubscribe' });
  }
});

module.exports = router;
