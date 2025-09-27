// import LiveSession from '../models/liveSession.model.js';
// import { createTeamsMeeting } from "../utils/teamsMeeting.js";
// import sendEmailNotification from "../utils/sendEmailNotification.js";

// export const bookLiveSession = async (req, res) => {
//   try {
//     const { employeeEmail, expertEmail, expertName, sessionDate, specialization, startTime, endTime } = req.body;

//     // Validate required fields
//     if (!employeeEmail || !expertEmail || !expertName || !sessionDate || !specialization || !startTime || !endTime) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const sessionCredits = 100; // Fixed credits for live sessions

//     // Check for existing booking for this employee
//     const existingBooking = await LiveSession.findOne({
//       employeeEmail,
//       sessionDate,
//       startTime,
//       status: 'booked'
//     });

//     if (existingBooking) {
//       return res.status(400).json({
//         success: false,
//         message: "You already have a session booked for this time slot"
//       });
//     }

//     // Check for existing session with same expert, date and time
//     let existingSession = await LiveSession.findOne({
//       expertEmail,
//       sessionDate,
//       startTime,
//       endTime
//     });

//     let meetingLink;

//     if (existingSession) {
//       // Reuse existing meeting link
//       meetingLink = existingSession.meetingLink;
//     } else {
//       // Create new Teams meeting only if no existing session
//       // Convert 12-hour time format to 24-hour format for Teams API
//       const formatTime = (time) => {
//         const [hour, modifier] = time.split(' ');
//         let [hours, minutes] = hour.split(':');
        
//         hours = parseInt(hours);
        
//         if (hours === 12) {
//           hours = modifier === 'AM' ? 0 : 12;
//         } else if (modifier === 'PM') {
//           hours += 12;
//         }
        
//         return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
//       };

//       const formattedStartTime = formatTime(startTime);
//       const formattedEndTime = formatTime(endTime);

//       meetingLink = await createTeamsMeeting(
//         process.env.MICROSOFT_TEAMS_USER_ID,
//         expertEmail,
//         expertName,
//         `${sessionDate}T${formattedStartTime}Z`,
//         `${sessionDate}T${formattedEndTime}Z`
//       );
//     }

//     // Create new session
//     const newSession = new LiveSession({
//       employeeEmail,
//       expertEmail,
//       expertName,
//       specialization,
//       sessionDate,
//       startTime,
//       endTime,
//       credits: req.body.credits || 100, 
//       meetingLink,
//       status: 'booked',
//       attendees: [employeeEmail]
//     });

//     const savedSession = await newSession.save();

//     // Send confirmation emails
//     const employeeSubject = "Live Session Booking Confirmation";
//     const employeeMessage = `
//       <h2>Live Session Confirmation</h2>
//       <p>Your session with ${expertName} has been confirmed.</p>
//       <p><b>Date:</b> ${sessionDate}</p>
//       <p><b>Time:</b> ${startTime} - ${endTime}</p>
//       <p><b>Join Link:</b> <a href="${meetingLink}">${meetingLink}</a></p>
//     `;

//     const expertSubject = "New Live Session Scheduled";
//     const expertMessage = `
//       <h2>New Session Scheduled</h2>
//       <p>A new session has been scheduled with ${employeeEmail}.</p>
//       <p><b>Date:</b> ${sessionDate}</p>
//       <p><b>Time:</b> ${startTime} - ${endTime}</p>
//       <p><b>Join Link:</b> <a href="${meetingLink}">${meetingLink}</a></p>
//     `;

//     await sendEmailNotification(employeeEmail, employeeSubject, null, employeeMessage);
//     await sendEmailNotification(expertEmail, expertSubject, null, expertMessage);

//     res.status(200).json({
//       success: true,
//       message: "Live session booked successfully!",
//       session: savedSession
//     });

//   } catch (error) {
//     console.error("Error booking live session:", error);
//     res.status(500).json({ success: false, message: "Failed to book live session" });
//   }
// };

// export const getLiveSessions = async (req, res) => {
//   try {
//     const { employeeEmail } = req.params;
//     const sessions = await LiveSession.find({
//       employeeEmail,
//       $or: [
//         { status: 'booked' },
//         { status: 'completed' },
//         {
//           status: 'cancelled',
//           cancelledAt: {
//             $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
//           }
//         }
//       ]
//     }).sort({ sessionDate: -1 });

//     res.json({
//       success: true,
//       sessions,
//       currentSessions: sessions.filter(s => s.status === 'booked'),
//       completedSessions: sessions.filter(s => s.status === 'completed'),
//       cancelledSessions: sessions.filter(s => s.status === 'cancelled')
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const cancelLiveSession = async (req, res) => {
//   try {
//     console.log("📝 Cancel request params:", req.params);
//     console.log("📝 Cancel request body:", req.body);
//     const { employeeEmail } = req.params;
//     const { sessionId } = req.params;
//     const { expertEmail, expertName, sessionDate, startTime, reason } = req.body;

//     const session = await LiveSession.findById(sessionId);

//     if (!session) {
//       return res.status(404).json({
//         success: false,
//         message: "Session not found or already cancelled"
//       });
//     }

//     session.status = 'cancelled';
//     session.isBooked = false;
//     session.cancelledAt = new Date();
//     session.cancelReason = reason || 'Cancelled by employee';

//     const updatedSession = await session.save();

//     // Send cancellation emails
//     const employeeSubject = "Session Cancellation Confirmation";
//     const employeeMessage = `
//       <h2>Session Cancelled</h2>
//       <p>Your session with ${session.expertName} on ${session.sessionDate} has been cancelled.</p>
//       <p><b>Reason:</b> ${session.cancelReason}</p>
//     `;

//     const expertSubject = "Session Cancellation Notice";
//     const expertMessage = `
//       <h2>Session Cancelled</h2>
//       <p>The session with ${session.employeeEmail} scheduled for ${session.sessionDate} has been cancelled.</p>
//       <p><b>Reason:</b> ${session.cancelReason}</p>
//     `;

//     await sendEmailNotification(session.employeeEmail, employeeSubject, null, employeeMessage);
//     await sendEmailNotification(session.expertEmail, expertSubject, null, expertMessage);

//     res.json({
//       success: true,
//       message: "Session cancelled successfully",
//       session: updatedSession
//     });
//   } catch (error) {
//     console.error("Error cancelling session:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
import LiveSession from '../models/liveSession.model.js';
import { createTeamsMeeting } from "../utils/teamsMeeting.js";
import sendEmailNotification from "../utils/sendEmailNotification.js";

export const bookLiveSession = async (req, res) => {
  try {
    const { employeeEmail, expertEmail, expertName, sessionDate, specialization, startTime, endTime } = req.body;

    // Validate required fields
    if (!employeeEmail || !expertEmail || !expertName || !sessionDate || !specialization || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const sessionCredits = 100; // Fixed credits for live sessions

    // Check for existing booking for this employee
    const existingBooking = await LiveSession.findOne({
      employeeEmail,
      sessionDate,
      startTime,
      status: 'booked'
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You already have a session booked for this time slot"
      });
    }

    // Check for existing session with same expert, date and time
    let existingSession = await LiveSession.findOne({
      expertEmail,
      sessionDate,
      startTime,
      endTime
    });

    let meetingLink;

    if (existingSession) {
      // Reuse existing meeting link
      meetingLink = existingSession.meetingLink;
    } else {
      // Create new Teams meeting only if no existing session
      // Convert 12-hour time format to 24-hour format for Teams API
      const formatTime = (time) => {
        const [hour, modifier] = time.split(' ');
        let [hours, minutes] = hour.split(':');
        
        hours = parseInt(hours);
        
        if (hours === 12) {
          hours = modifier === 'AM' ? 0 : 12;
        } else if (modifier === 'PM') {
          hours += 12;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
      };

      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);

      meetingLink = await createTeamsMeeting(
        process.env.MICROSOFT_TEAMS_USER_ID,
        expertEmail,
        expertName,
        `${sessionDate}T${formattedStartTime}Z`,
        `${sessionDate}T${formattedEndTime}Z`
      );
    }

    // Create new session
    const newSession = new LiveSession({
      employeeEmail,
      expertEmail,
      expertName,
      specialization,
      sessionDate,
      startTime,
      endTime,
      credits: req.body.credits || 100, 
      meetingLink,
      status: 'booked',
      attendees: [employeeEmail]
    });

    const savedSession = await newSession.save();
  //  <img src="https://ekaant.onrender.com/public/logo-ekaant.png" alt="EKAANT" style="height: 60px;">
    // Send confirmation emails
    const employeeSubject = "🎉 Your Ekaant Session is Confirmed!";
    const employeeMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  
        <h2 style="color: #2C3E50; border-bottom: 2px solid #E74C3C; padding-bottom: 10px;">Your Mental Wellness Session is Confirmed</h2>

        <p style="color: #34495E;">Dear Valued Member,</p>

        <p style="color: #34495E;">We're delighted to confirm your upcoming session with <b>Dr. ${expertName}</b>.</p>

        <div style="background: #F8F9FA; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2C3E50; margin-top: 0;">Session Details:</h3>
          <p><b>📅 Date:</b> ${sessionDate}</p>
          <p><b>⏰ Time:</b> ${startTime} - ${endTime}</p>
          <p><b>👨‍⚕️ Expert:</b> Dr. ${expertName}</p>
          <p><b>🎯 Specialization:</b> ${specialization}</p>
          <p><b>🔗 Join Link:</b> <a href="${meetingLink}" style="color: #E74C3C;">${meetingLink}</a></p>
        </div>

        <div style="background: #E8F4F8; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="color: #2C3E50; margin-top: 0;">Preparation Tips:</h4>
          <ul style="color: #34495E;">
            <li>Find a quiet, private space for your session</li>
            <li>Test your camera and microphone beforehand</li>
            <li>Keep a notepad handy for important points</li>
            <li>Join 5 minutes early to ensure a smooth start</li>
          </ul>
        </div>

        <p style="color: #34495E;">If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>

        <p style="color: #34495E;">For any technical support, reach out to us at support@ekaant.com</p>

        <p style="color: #34495E;">Best regards,<br>Team Ekaant</p>

        <div style="border-top: 1px solid #E0E0E0; margin-top: 20px; padding-top: 10px; font-size: 12px; color: #7F8C8D;">
          <p>This is a confidential communication. Please do not forward this email.</p>
        </div>
      </div>
    `;

    const expertSubject = "📅 New Session Scheduled | Ekaant Platform";
    const expertMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2C3E50; border-bottom: 2px solid #E74C3C; padding-bottom: 10px;">New Session Scheduled</h2>

        <p style="color: #34495E;">Dear Dr. ${expertName},</p>

        <p style="color: #34495E;">A new session has been scheduled on your Ekaant calendar.</p>

        <div style="background: #F8F9FA; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2C3E50; margin-top: 0;">Session Details:</h3>
          <p><b>📅 Date:</b> ${sessionDate}</p>
          <p><b>⏰ Time:</b> ${startTime} - ${endTime}</p>
          <p><b>👤 Client:</b> ${employeeEmail}</p>
          <p><b>🎯 Session Type:</b> ${specialization}</p>
          <p><b>🔗 Join Link:</b> <a href="${meetingLink}" style="color: #E74C3C;">${meetingLink}</a></p>
        </div>

        <div style="background: #E8F4F8; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="color: #2C3E50; margin-top: 0;">Pre-session Checklist:</h4>
          <ul style="color: #34495E;">
            <li>Review any previous session notes if applicable</li>
            <li>Ensure your professional space is ready</li>
            <li>Test your audio/video equipment</li>
            <li>Join 5 minutes early to welcome the client</li>
          </ul>
        </div>

        <p style="color: #34495E;">Please confirm your availability by logging into your Ekaant dashboard.</p>

        <p style="color: #34495E;">For any queries or technical support, contact our expert support team at expert.support@ekaant.com</p>

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
      message: "Live session booked successfully!",
      session: savedSession
    });

  } catch (error) {
    console.error("Error booking live session:", error);
    res.status(500).json({ success: false, message: "Failed to book live session" });
  }
};

export const getLiveSessions = async (req, res) => {
  try {
    const { employeeEmail } = req.params;
    const sessions = await LiveSession.find({
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

export const cancelLiveSession = async (req, res) => {
  try {
    console.log("📝 Cancel request params:", req.params);
    console.log("📝 Cancel request body:", req.body);
    const { employeeEmail } = req.params;
    const { sessionId } = req.params;
    const { expertEmail, expertName, sessionDate, startTime, reason } = req.body;

    const session = await LiveSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found or already cancelled"
      });
    }

    session.status = 'cancelled';
    session.isBooked = false;
    session.cancelledAt = new Date();
    session.cancelReason = reason || 'Cancelled by employee';

    const updatedSession = await session.save();

    // Send cancellation emails
    const employeeSubject = "Session Cancellation Confirmation";
    const employeeMessage = `
      <h2>Session Cancelled</h2>
      <p>Your session with ${session.expertName} on ${session.sessionDate} has been cancelled.</p>
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
    console.error("Error cancelling session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};