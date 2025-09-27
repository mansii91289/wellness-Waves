
import mongoose from 'mongoose';

const ChallengeProgressSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  challengeType: {
    type: String,
    required: true,
    enum: ['dopamineTrigger', 'inclusiveWorkplaces', 'stressRelease']
  },
  activities: [{
    dayIndex: Number,
    activityIndex: Number,
    completed: Boolean,
    completedAt: Date
  }],
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  unlockedDays: {
    type: [Number],
    default: [0]
  }
}, { timestamps: true });

const ChallengeProgressTracking = mongoose.model('ChallengeProgressTracking', ChallengeProgressSchema);

export default ChallengeProgressTracking;
