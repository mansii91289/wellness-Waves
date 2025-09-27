
import mongoose from 'mongoose';

const lineChartSchema = new mongoose.Schema({
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
  program: {
    type: Number,
    default: 0
  },
  livesessions: {
    type: Number,
    default: 0
  },
  expert: {
    type: Number,
    default: 0
  },
  challenges: {
    type: Number,
    default: 0
  },
  groupcoaching: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('LineChart', lineChartSchema);
