
import mongoose from 'mongoose';

const ProgramTrackerSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  programType: {
    type: String,
    required: true,
    enum: ['preventBurnout', 'manageStress', 'cultivateSleep', 'stressedToBalanced', 'buildResilience', 'meditationBasics', 'mindfulLeaders', 'healthyHabits', 'yogaBasics']
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
  unlockedLevels: {
    type: [Number],
    default: [0]
  }
}, { timestamps: true });

const ProgramTrackerTracking = mongoose.model('ProgramTrackerTracking', ProgramTrackerSchema);

export default ProgramTrackerTracking;
