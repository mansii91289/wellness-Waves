
import ExpertSession from '../models/expertSession.model.js';
import { v4 as uuidv4 } from 'uuid';
import { createTeamsMeeting } from "../utils/teamsMeeting.js";
import sendEmailNotification from "../utils/sendEmailNotification.js";

export const checkSlotAvailability = async (req, res) => {
    try {
        const { expertEmail, sessionDate, startTime } = req.params;

        const existingBooking = await ExpertSession.findOne({
            expertEmail,
            sessionDate: new Date(sessionDate),
            startDateTime: { 
                $gte: new Date(`${sessionDate}T${startTime}`),
                $lt: new Date(`${sessionDate}T${startTime}`).setMinutes(new Date(`${sessionDate}T${startTime}`).getMinutes() + 45)
            },
            status: 'booked',
            isBooked: true
        });

        res.json({
            success: true,
            isBooked: !!existingBooking
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const bookExpertSession = async (req, res) => {
  try {
    const { employeeId, employeeEmail, expertEmail, expertName, specialization, sessionDate, startDateTime, endDateTime } = req.body;

    // Check if employee already has a session at this time
    const existingSession = await ExpertSession.findOne({
      employeeId,
      status: 'booked',
      isBooked: true,
      $or: [
        {
          startDateTime: { $lte: new Date(startDateTime) },
          endDateTime: { $gte: new Date(startDateTime) }
        },
        {
          startDateTime: { $lte: new Date(endDateTime) },
          endDateTime: { $gte: new Date(endDateTime) }
        }
      ]
    });
    
    console.log("🔍 Checking existing session:", existingSession);

    if (existingSession) {
      return res.status(400).json({
        success: false,
        message: "You already have a session booked during this time slot"
      });
    }

    let meetingLink;
    try {
      meetingLink = await createTeamsMeeting(employeeEmail, expertEmail, expertName, startDateTime, endDateTime);
      if (!meetingLink) {
        throw new Error("Failed to generate Teams meeting link");
      }
      console.log("✅ Teams Meeting Created:", meetingLink);
    } catch (error) {
      console.error("❌ Teams Meeting Error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create Teams meeting" 
      });
    }

    console.log("Creating new session with data:", {
      employeeId,
      employeeEmail,
      expertEmail,
      expertName,
      specialization,
      sessionDate,
      startDateTime,
      endDateTime,
      meetingLink
    });

    const newSession = new ExpertSession({
      employeeId: employeeId.toString(),
      employeeEmail,
      expertEmail,
      expertName,
      specialization,
      sessionDate: new Date(sessionDate),
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
      meetingLink,
      status: 'booked',
      isBooked: true,
      rating: req.body.rating || 0,
      levels: req.body.levels || 0,
      overview: req.body.overview || '',
      image: req.body.image || ''
    });

    let savedSession;
    try {
      savedSession = await newSession.save();
      console.log("✅ Session saved successfully:", savedSession);
    } catch (dbError) {
      console.error("❌ Database Error:", dbError);
      return res.status(500).json({
        success: false,
        message: `Failed to save session: ${dbError.message}`,
        error: dbError
      });
    }

    if (!savedSession) {
      return res.status(500).json({
        success: false,
        message: "Failed to save session"
      });
    }
// <img src="https://ekaant.onrender.com/public/logo-ekaant.png" alt="EKAANT" style="height: 60px;">
    // Send confirmation emails
    const employeeSubject = "📅 Your One-on-One Expert Session is Confirmed | Ekaant Wellness";
    const employeeMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
        
        </div>

        <h2 style="color: #2C3E50; border-bottom: 2px solid #3498DB; padding-bottom: 10px;">Your Expert Session is Confirmed!</h2>

        <p style="color: #34495E;">Dear Wellness Seeker,</p>

        <p style="color: #34495E;">Your one-on-one session with ${expertName} has been successfully scheduled.</p>

        <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2C3E50; margin-top: 0;">Session Details:</h3>
          <p><strong>📅 Date:</strong> ${sessionDate}</p>
          <p><strong>⏰ Time:</strong> ${new Date(startDateTime).toLocaleTimeString()} - ${new Date(endDateTime).toLocaleTimeString()}</p>
          <p><strong>👨‍⚕️ Expert:</strong> Dr. ${expertName}</p>
          <p><strong>🎯 Focus Area:</strong> ${specialization}</p>
          <p><strong>🔗 Join Link:</strong> <a href="${meetingLink}" style="color: #3498DB;">${meetingLink}</a></p>
        </div>

        <div style="background: #E8F4F8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #2C3E50; margin-top: 0;">Preparation Tips:</h4>
          <ul style="color: #34495E;">
            <li>Find a quiet, private space for your session</li>
            <li>Test your camera and microphone beforehand</li>
            <li>Keep a notepad handy for important points</li>
            <li>Join 5 minutes early to ensure a smooth start</li>
            <li>Prepare any questions you'd like to discuss</li>
          </ul>
        </div>

        <p style="color: #34495E;">Need to reschedule? Please do so at least 24 hours in advance through your Ekaant dashboard.</p>

        <p style="color: #34495E;">For technical support, contact us at support@ekaant.com</p>

        <p style="color: #34495E;">Wishing you a transformative session!<br>Team Ekaant</p>

        <div style="border-top: 1px solid #E0E0E0; margin-top: 20px; padding-top: 10px; font-size: 12px; color: #7F8C8D;">
          <p>This is a confidential communication. Please do not forward this email.</p>
        </div>
      </div>
    `;

    const expertSubject = "📅 New One-on-One Session Scheduled | Ekaant Wellness";
    const expertMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://ekaant.com/logo.png" alt="Ekaant Logo" style="max-width: 150px;">
        </div>

        <h2 style="color: #2C3E50; border-bottom: 2px solid #3498DB; padding-bottom: 10px;">New One-on-One Session Scheduled</h2>

        <p style="color: #34495E;">Dear Dr. ${expertName},</p>

        <p style="color: #34495E;">A new one-on-one session has been scheduled on your Ekaant calendar.</p>

        <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2C3E50; margin-top: 0;">Session Details:</h3>
          <p><strong>📅 Date:</strong> ${sessionDate}</p>
          <p><strong>⏰ Time:</strong> ${new Date(startDateTime).toLocaleTimeString()} - ${new Date(endDateTime).toLocaleTimeString()}</p>
          <p><strong>👤 Client:</strong> ${employeeEmail}</p>
          <p><strong>🎯 Focus Area:</strong> ${specialization}</p>
          <p><strong>🔗 Join Link:</strong> <a href="${meetingLink}" style="color: #3498DB;">${meetingLink}</a></p>
        </div>

        <div style="background: #E8F4F8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #2C3E50; margin-top: 0;">Pre-session Checklist:</h4>
          <ul style="color: #34495E;">
            <li>Review client information if available</li>
            <li>Ensure your professional space is ready</li>
            <li>Test your audio/video equipment</li>
            <li>Join 5 minutes early to welcome the client</li>
            <li>Have your session notes template ready</li>
          </ul>
        </div>

        <p style="color: #34495E;">Please confirm your availability by logging into your Ekaant dashboard.</p>

        <p style="color: #34495E;">For technical support or queries, contact expert.support@ekaant.com</p>

        <p style="color: #34495E;">Best regards,<br>Team Ekaant</p>

        <div style="border-top: 1px solid #E0E0E0; margin-top: 20px; padding-top: 10px; font-size: 12px; color: #7F8C8D;">
          <p>This communication is confidential and contains privileged information.</p>
        </div>
      </div>
    `;

    await sendEmailNotification(employeeEmail, employeeSubject, null, employeeMessage);
    await sendEmailNotification(expertEmail, expertSubject, null, expertMessage);

    res.status(200).json({ 
      success: true, 
      message: "Expert session booked successfully!",
      session: savedSession
    });

  } catch (error) {
    console.error("Error booking expert session:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to book expert session" 
    });
  }
};

export const getExpertSessions = async (req, res) => {
  try {
    const { employeeEmail } = req.params;
    const sessions = await ExpertSession.find({ 
      employeeEmail,
      $or: [
        { status: 'booked' },
        { status: 'completed' },
        { 
          status: 'cancelled',
          cancelledAt: { 
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
          } 
        }
      ]
    }).sort({ sessionDate: -1 });

    res.json({ 
      success: true, 
      sessions,
      currentSessions: sessions.filter(s => s.status === 'booked'),
      completedSessions: sessions.filter(s => s.status === 'completed'),
      cancelledSessions: sessions.filter(s => s.status === 'cancelled')
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelExpertSession = async (req, res) => {
  try {
    const { employeeEmail } = req.params;
    const { expertEmail, sessionDate, startTime, reason } = req.body;

    const session = await ExpertSession.findOne({ 
      employeeEmail,
      expertEmail,
      sessionDate: new Date(sessionDate),
      startDateTime: { 
        $gte: new Date(`${sessionDate}T${startTime}`),
        $lt: new Date(`${sessionDate}T${startTime}`).setMinutes(new Date(`${sessionDate}T${startTime}`).getMinutes() + 45)
      },
      status: 'booked',
      isBooked: true
    });
    console.log("🔍 Found session to cancel:", session);
    
    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: "Session not found" 
      });
    }

    if (session.status !== 'booked' || !session.isBooked) {
      return res.status(400).json({
        success: false,
        message: "Only booked sessions can be cancelled"
      });
    }

    // Update session status and add cancellation details
    session.status = 'cancelled';
    session.isBooked = false;
    session.cancelledAt = new Date();
    session.cancelReason = reason || 'Cancelled by employee';
    
    // Add any metadata about cancellation
    session.cancellationMetadata = {
      cancelledBy: employeeEmail,
      originalStartTime: session.startDateTime,
      originalEndTime: session.endDateTime,
      cancelledAt: new Date()
    };
    
    const updatedSession = await session.save();
    console.log("✅ Session cancelled successfully:", updatedSession);

    // Send cancellation emails
    const employeeSubject = "Session Cancellation Confirmation";
    const employeeMessage = `
      <h2>Session Cancelled</h2>
      <p>Your session with Dr. ${session.expertName} on ${session.sessionDate} has been cancelled.</p>
      <p><b>Reason:</b> ${session.cancelReason}</p>
    `;

    const expertSubject = "Session Cancellation Notice";
    const expertMessage = `
      <h2>Session Cancelled</h2>
      <p>The session with ${session.employeeEmail} scheduled for ${session.sessionDate} has been cancelled.</p>
      <p><b>Reason:</b> ${session.cancelReason}</p>
    `;

    await sendEmailNotification(session.employeeEmail, employeeSubject, null, employeeMessage);
    await sendEmailNotification(session.expertEmail, expertSubject, null, expertMessage);

    res.json({ 
      success: true, 
      message: "Session cancelled successfully",
      session: updatedSession
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};