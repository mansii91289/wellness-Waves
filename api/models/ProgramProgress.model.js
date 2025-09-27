
import mongoose from 'mongoose';

const programProgressSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  programId: {
    type: Number,
    required: true
  },
  programName: {
    type: String,
    required: true
  },
  currentLevel: {
    type: Number,
    default: 0
  },
  completedLevels: [{
    levelIndex: Number,
    completedAt: Date,
    name: String
  }],
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ProgramProgress = mongoose.model('ProgramProgress', programProgressSchema);
export default ProgramProgress;
