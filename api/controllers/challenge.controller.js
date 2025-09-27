
import ChallengeProgress from '../models/challenge.model.js';
import Employee from '../models/employee.model.js';

export const joinChallenge = async (req, res) => {
  try {
    const { challengeId, challengeName, creditsToSpend } = req.body;
    const employeeId = req.employee.id;
    
    // Get employee email
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Check if already joined
    const existingProgress = await ChallengeProgress.findOne({
      employeeId,
      challengeId
    });

    if (existingProgress) {
      return res.status(400).json({ success: false, message: 'Already joined this challenge' });
    }

    // Check if employee has enough credits
    if (employee.credits < creditsToSpend) {
      return res.status(400).json({ success: false, message: 'Not enough credits' });
    }

    // Deduct credits and create challenge progress
    employee.credits -= creditsToSpend;
    await employee.save();

    const challengeProgress = new ChallengeProgress({
      employeeId,
      employeeEmail: employee.email,
      challengeId,
      challengeName,
      creditsSpent: creditsToSpend
    });

    await challengeProgress.save();
    console.log("✅ Challenge joined successfully");

    res.status(200).json({ 
      success: true, 
      challengeProgress,
      updatedCredits: employee.credits 
    });

  } catch (error) {
    console.error("❌ Error joining challenge:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChallenges = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    const status = req.query.status || 'Active';

    const challenges = await ChallengeProgress.find({ 
      employeeId,
      status 
    });

    console.log("✅ Fetched challenges for employee:", employeeId);
    res.status(200).json({ success: true, challenges });
  } catch (error) {
    console.error("❌ Error fetching challenges:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
