const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to a User model, or use String if you don't have one
    required: true,
  },
  sessionType: {
    type: String,
    required: true,
    // Example session types; adjust as needed
    enum: ['sessionType1', 'sessionType2', 'sessionType3', 'sessionType4', 'sessionType5'],
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes (optional)
    required: false,
  },
  description: {
    type: String,
    default: '',
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
