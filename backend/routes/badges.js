const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajouter un badge
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const badge = await prisma.badge.create({
      data: { name, description },
    });
    res.status(201).json(badge);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add badge' });
  }
});

// Assigner un badge à un utilisateur
router.post('/assign', async (req, res) => {
  const { userId, badgeId } = req.body;
  try {
    const userBadge = await prisma.userBadge.create({
      data: { userId, badgeId },
    });
    res.status(201).json(userBadge);
  } catch (error) {
    res.status(400).json({ error: 'Unable to assign badge' });
  }
});

// Obtenir les badges d'un utilisateur
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const badges = await prisma.userBadge.findMany({
      where: { userId: parseInt(userId) },
      include: { badge: true }
    });
    res.status(200).json(badges);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch badges' });
  }
});

module.exports = router;
