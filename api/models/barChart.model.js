
import mongoose from 'mongoose';

const barChartSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  Program: {
    type: Number,
    default: 0
  },
  LiveSessions: {
    type: Number,
    default: 0
  },
  Experts: {
    type: Number,
    default: 0
  },
  Challenge: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('BarChart', barChartSchema);
