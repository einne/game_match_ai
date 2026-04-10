const express = require('express');
const {
  createMatchRequest,
  getAllMatchRequests,
  getMyMatchRequests,
  getMatchRequestById,
  updateMatchRequest,
  deleteMatchRequest
} = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createMatchRequest);
router.get('/', getAllMatchRequests);
router.get('/mine', protect, getMyMatchRequests);
router.get('/:id', getMatchRequestById);
router.put('/:id', protect, updateMatchRequest);
router.delete('/:id', protect, deleteMatchRequest);

module.exports = router;
