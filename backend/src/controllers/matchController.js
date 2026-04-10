const mongoose = require('mongoose');
const MatchRequest = require('../models/MatchRequest');

function formatMatchResponse(matchRequest) {
  return {
    id: matchRequest._id,
    recruitmentTitle: matchRequest.recruitmentTitle,
    game: matchRequest.game,
    requiredRank: matchRequest.requiredRank,
    requiredRole: matchRequest.requiredRole,
    region: matchRequest.region,
    playTime: matchRequest.playTime,
    description: matchRequest.description,
    status: matchRequest.status,
    userId: matchRequest.userId,
    createdAt: matchRequest.createdAt,
    updatedAt: matchRequest.updatedAt
  };
}

function validateCreatePayload(payload) {
  const requiredFields = [
    'recruitmentTitle',
    'game',
    'requiredRank',
    'requiredRole',
    'region',
    'playTime',
    'description'
  ];

  const missingField = requiredFields.find((field) => !payload[field]);
  if (missingField) {
    return `Field "${missingField}" is required.`;
  }

  if (payload.status && !['open', 'closed'].includes(payload.status)) {
    return 'Status must be either "open" or "closed".';
  }

  return null;
}

function buildUpdatePayload(body) {
  const allowedFields = [
    'recruitmentTitle',
    'game',
    'requiredRank',
    'requiredRole',
    'region',
    'playTime',
    'description',
    'status'
  ];

  const updates = {};
  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  });

  return updates;
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function createMatchRequest(req, res) {
  try {
    const validationError = validateCreatePayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const matchRequest = await MatchRequest.create({
      recruitmentTitle: req.body.recruitmentTitle,
      game: req.body.game,
      requiredRank: req.body.requiredRank,
      requiredRole: req.body.requiredRole,
      region: req.body.region,
      playTime: req.body.playTime,
      description: req.body.description,
      status: req.body.status || 'open',
      userId: req.user._id
    });

    return res.status(201).json({
      message: 'Match request created successfully.',
      matchRequest: formatMatchResponse(matchRequest)
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error while creating match request.' });
  }
}

async function getAllMatchRequests(req, res) {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.game) {
      filter.game = req.query.game;
    }
    if (req.query.region) {
      filter.region = req.query.region;
    }

    const matchRequests = await MatchRequest.find(filter).sort({ createdAt: -1 });

    return res.json({
      count: matchRequests.length,
      matchRequests: matchRequests.map(formatMatchResponse)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching match requests.' });
  }
}

async function getMyMatchRequests(req, res) {
  try {
    const matchRequests = await MatchRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.json({
      count: matchRequests.length,
      matchRequests: matchRequests.map(formatMatchResponse)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching your match requests.' });
  }
}

async function getMatchRequestById(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid match request id.' });
    }

    const matchRequest = await MatchRequest.findById(id);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found.' });
    }

    return res.json({ matchRequest: formatMatchResponse(matchRequest) });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching match request.' });
  }
}

async function updateMatchRequest(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid match request id.' });
    }

    const updates = buildUpdatePayload(req.body);
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    if (updates.status && !['open', 'closed'].includes(updates.status)) {
      return res.status(400).json({ message: 'Status must be either "open" or "closed".' });
    }

    const matchRequest = await MatchRequest.findById(id);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found.' });
    }

    if (matchRequest.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own match requests.' });
    }

    Object.assign(matchRequest, updates);
    await matchRequest.save();

    return res.json({
      message: 'Match request updated successfully.',
      matchRequest: formatMatchResponse(matchRequest)
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error while updating match request.' });
  }
}

async function deleteMatchRequest(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid match request id.' });
    }

    const matchRequest = await MatchRequest.findById(id);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found.' });
    }

    if (matchRequest.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own match requests.' });
    }

    await matchRequest.deleteOne();

    return res.json({ message: 'Match request deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while deleting match request.' });
  }
}

module.exports = {
  createMatchRequest,
  getAllMatchRequests,
  getMyMatchRequests,
  getMatchRequestById,
  updateMatchRequest,
  deleteMatchRequest
};
