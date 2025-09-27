import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model( 'Session', sessionSchema);