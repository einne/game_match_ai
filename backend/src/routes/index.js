const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const matchRoutes = require('./matchRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'GameMatch AI API' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/matches', matchRoutes);

module.exports = router;
