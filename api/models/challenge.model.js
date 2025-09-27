
import mongoose from 'mongoose';

const challengeProgressSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  challengeId: {
    type: Number,
    required: true
  },
  challengeName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Completed'],
    default: 'Active'
  },
  creditsSpent: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, { timestamps: true });

const ChallengeProgress = mongoose.model('ChallengeProgress', challengeProgressSchema);
export default ChallengeProgress;
