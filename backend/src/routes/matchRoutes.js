const express = require('express');
const { getMatchSuggestions } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/suggestions', protect, getMatchSuggestions);

module.exports = router;
