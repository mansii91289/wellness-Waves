// models/Dashboard.js
const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  wellbeingScore: {
    type: Number,
    required: true,
  },
  wellbeing: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
    }
  ],
  timeTrack: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
    }
  ],
  sessions: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
    }
  ],
  averageTime: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
    }
  ],
  checkIn: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
