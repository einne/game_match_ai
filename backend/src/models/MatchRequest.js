const mongoose = require('mongoose');

const matchRequestSchema = new mongoose.Schema(
  {
    recruitmentTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    game: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    requiredRank: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    requiredRole: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    region: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    playTime: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MatchRequest', matchRequestSchema);
