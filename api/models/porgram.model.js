
import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  overview: {
    levels: Number,
    length: String
  },
  description: String,
  experts: [{
    name: String,
    photo: String,
    rating: Number,
    reviews: Number,
    description: String
  }],
  journey: [{
    level: Number,
    name: String,
    video: String,
    duration: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  currentLevel: {
    type: Number,
    default: 0
  },
  completedLevels: [{
    type: Number
  }],
  progress: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Program = mongoose.model('Program', programSchema);
export default Program;
