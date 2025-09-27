
import Notification from '../models/notification.model.js';

export const createNotification = async (req, res) => {
  try {
    // Set expiration to 24 hours after session date
    const sessionDate = new Date(req.body.sessionDate);
    const expiresAt = new Date(sessionDate.getTime() + 24 * 60 * 60 * 1000);
    
    const notification = new Notification({
      ...req.body,
      employeeId: req.employee._id,
      expiresAt
    });
    
    await notification.save();
    res.json({ success: true, notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      employeeId: req.employee._id,
      sessionDate: { $gte: new Date() }
    })
    .sort({ bookingTime: -1 })
    .limit(50);
    
    res.json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, employeeId: req.employee._id },
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    
    res.json({ success: true, notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
