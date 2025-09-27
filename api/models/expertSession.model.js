
// import mongoose from 'mongoose';

// const expertSessionSchema = new mongoose.Schema({
//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Employee',
//     required: true
//   },
//   employeeEmail: {
//     type: String,
//     required: true
//   },
//   expertEmail: {
//     type: String,
//     required: true
//   },
//   expertName: {
//     type: String,
//     required: true
//   },
//   specialization: {
//     type: String,
//     required: true
//   },
//   sessionDate: {
//     type: Date,
//     required: true
//   },
//   startDateTime: {
//     type: Date,
//     required: true
//   },
//   endDateTime: {
//     type: Date,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['booked', 'cancelled', 'completed'],
//     default: 'booked'
//   },
//   meetingLink: String,
//   isBooked: {
//     type: Boolean,
//     default: true
//   },
//   cancelledAt: {
//     type: Date,
//     default: null
//   },
//   cancelReason: {
//     type: String,
//     default: null
//   }
// }, { timestamps: true });

// export default mongoose.model('ExpertSession', expertSessionSchema);
import mongoose from 'mongoose';

const expertSessionSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0
  },
  levels: {
    type: Number,
    default: 0
  },
  overview: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeEmail: {
    type: String,
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
  specialization: {
    type: String,
    required: true
  },
  sessionDate: {
    type: Date,
    required: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
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
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  cancelReason: {
    type: String,
    default: null
  },
  cancellationMetadata: {
    cancelledBy: String,
    originalStartTime: Date,
    originalEndTime: Date,
    cancelledAt: Date
  }
}, { 
  timestamps: true,
  strict: false 
});

export default mongoose.model('ExpertSession', expertSessionSchema);