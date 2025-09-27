
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: String,
  price: String,
  doctorName: {
    type: String,
    required: true
  },
  doctorSpecialty: String,
  read: {
    type: Boolean,
    default: false
  },
  sessionDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['expert', 'live'],
    required: true
  },
  bookingTime: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

// Add TTL index for automatic expiration
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Notification", notificationSchema);
