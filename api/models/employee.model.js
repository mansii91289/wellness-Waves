
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  credits: {
    type: Number, 
    default: 10000, // Initial credits for new users
    min: 0,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,

  },
  role: {
    type: String,
    default: 'employee'
  },
  employeeId: {
    type: String,
  
  },
  department: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
