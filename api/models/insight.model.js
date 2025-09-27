
import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  answers: [{
    question: String,
    selectedOption: String,
    customAnswer: String
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Insight = mongoose.model('Insight', insightSchema);
export default Insight;
