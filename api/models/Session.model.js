

// import mongoose from "mongoose";

// const sessionSchema = new mongoose.Schema({
//   sessionDate: { type: String, required: true },
//   expertEmail: { type: String, required: true },
//   expertName: { type: String, required: true },
//   specialization: { type: String, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   meetingLink: { type: String, default: null },
//   platform: { type: String, enum: ['teams'], default: 'teams' },
//   attendees: [{ type: String }],
//   maxAttendees: { type: Number, default: 50 }
// }, { timestamps: true });

// const Session = mongoose.model("Session", sessionSchema);
// export default Session;


import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionDate: { type: String, required: true },
  expertEmail: { type: String, required: true },
  expertName: { type: String, required: true },
  specialization: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  meetingLink: { type: String, default: null },
  platform: { type: String, enum: ['teams'], default: 'teams' },
  attendees: [{ type: String }],
  maxAttendees: { type: Number, default: 50 },
  isActive: { type: Boolean, default: true },
  credits: { type: Number, required: true },
  sessionType: { type: String, enum: ['group', 'individual'], default: 'group' },
  cancellations: [{
    employeeEmail: String,
    cancelledAt: Date,
    reason: String
  }]
}, { timestamps: true });

export default mongoose.models.Session || mongoose.model("Session", sessionSchema);
