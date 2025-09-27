import ChallengeProgressTracking from '../models/ChallengeProgress.model.js';

export const updateProgress = async (req, res) => {
  try {
    const { challengeType, dayIndex, activityIndex, completed } = req.body;
    const employeeId = req.employee.id;
    const employeeEmail = req.employee.email;

    // Find existing progress or create new
    let progress = await ChallengeProgressTracking.findOneAndUpdate(
      {
        employeeId,
        employeeEmail,
        challengeType
      },
      {
        $setOnInsert: {
          employeeId,
          employeeEmail,
          challengeType,
          activities: [],
          unlockedDays: [0]
        }
      },
      { upsert: true, new: true }
    );

    if (!progress) {
      progress = new ChallengeProgressTracking({
        employeeId,
        employeeEmail,
        challengeType,
        activities: [],
        unlockedDays: [0]
      });
    }

    const existingActivityIndex = progress.activities.findIndex(
      a => a.dayIndex === dayIndex && a.activityIndex === activityIndex
    );

    if (existingActivityIndex !== -1) {
      progress.activities[existingActivityIndex].completed = completed;
      progress.activities[existingActivityIndex].completedAt = new Date();
    } else if (completed) {
      progress.activities.push({
        dayIndex,
        activityIndex,
        completed,
        completedAt: new Date()
      });
    }

    progress.lastAccessedAt = new Date();
    await progress.save();

    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unlockDay = async (req, res) => {
  try {
    const { challengeType, unlockedDay } = req.body;
    const employeeId = req.employee.id;
    const employeeEmail = req.employee.email;

    let progress = await ChallengeProgressTracking.findOne({
      employeeId,
      employeeEmail,
      challengeType
    });

    if (!progress) {
      progress = new ChallengeProgressTracking({
        employeeId,
        employeeEmail,
        challengeType,
        unlockedDays: [0]
      });
    }

    if (!progress.unlockedDays.includes(unlockedDay)) {
      progress.unlockedDays.push(unlockedDay);
    }

    await progress.save();
    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    const { challengeType } = req.query;

    const progress = await ChallengeProgressTracking.findOne({
      employeeId,
      challengeType
    });

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};