import mongoose from 'mongoose';

const liveSessionSchema = new mongoose.Schema({
  employeeEmail: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  expertEmail: {
    type: String,
    required: true
  },
  expertName: {
    type: String,
    required: true
  },
  sessionDate: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  meetingLink: String,
  isBooked: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('LiveSession', liveSessionSchema);