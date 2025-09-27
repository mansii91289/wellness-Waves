
import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  activityType: {
    type: String,
    enum: ['expert_session', 'live_session', 'program', 'challenge'],
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'attended', 'cancelled', 'completed'],
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  startTime: Date,
  endTime: Date,
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);
