import ActivityLog from '../models/activityLog.model.js';
import Employee from '../models/employee.model.js';
import LiveSession from '../models/liveSession.model.js';
import { v4 as uuidv4 } from 'uuid';

// Get booked sessions for an employee
export const getBookedSessions = async (req, res) => {
  try {
    const { employeeEmail } = req.params;
    const sessions = await LiveSession.find({ employeeEmail }); // Assuming LiveSession is the model for booked sessions
    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel a booked session
export const cancelSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { employeeEmail } = req.body;

    const session = await LiveSession.findOneAndDelete({ 
      _id: sessionId,
      employeeEmail 
    });

    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: "Session not found or unauthorized" 
      });
    }

    res.json({ success: true, message: "Session cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bookLiveSession = async (req, res) => {
  try {
    const { employeeEmail, expertEmail, expertName, sessionDate, specialization, startTime, endTime } = req.body;

    if (!employeeEmail || !expertEmail || !expertName || !sessionDate || !specialization || !startTime || !endTime) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    const meetingLink = `https://meet.google.com/${uuidv4().substring(0, 12)}`;

    const newSession = new LiveSession({
      employeeEmail,
      expertEmail,
      expertName,
      sessionDate,
      specialization,
      startDateTime: startTime,
      endDateTime: endTime,
      timeSlot: `${startTime} - ${endTime}`,
      meetingLink,
      status: 'booked'
    });

    await newSession.save();

    // Log the activity
    const activityLog = new ActivityLog({
      employeeId: employeeEmail,
      activityType: 'LIVE_SESSION_BOOKING',
      itemId: newSession._id,
      status: 'booked',
      metadata: {
        expertName,
        sessionDate,
        timeSlot: `${startTime} - ${endTime}`
      }
    });

    await activityLog.save();

    res.status(200).json({ 
      success: true, 
      message: "Session booked successfully!",
      meetingLink,
      sessionDetails: newSession
    });

  } catch (error) {
    console.error("Error booking live session:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to complete booking process." 
    });
  }
};

export const logActivity = async (req, res) => {
  try {
    const {
      employeeId,
      activityType,
      itemId,
      status,
      credits,
      startTime,
      endTime,
      metadata
    } = req.body;

    const newLog = new ActivityLog({
      employeeId,
      activityType,
      itemId,
      status,
      credits,
      startTime,
      endTime,
      metadata
    });

    await newLog.save();

    res.status(200).json({
      success: true,
      message: "Activity logged successfully",
      log: newLog
    });
  } catch (error) {
    console.error("Error logging activity:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log activity",
      error: error.message
    });
  }
};

export const getEmployeeActivities = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const activities = await ActivityLog.find({ employeeId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      activities
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message
    });
  }
};