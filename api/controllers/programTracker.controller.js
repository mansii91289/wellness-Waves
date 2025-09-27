
import ProgramTrackerTracking from '../models/programTracker.model.js';

export const updateProgress = async (req, res) => {
  try {
    const { programType, dayIndex, activityIndex, completed } = req.body;
    const employeeId = req.employee.id;
    const employeeEmail = req.employee.email;

    let progress = await ProgramTrackerTracking.findOneAndUpdate(
      {
        employeeId,
        employeeEmail,
        programType
      },
      {
        $setOnInsert: {
          employeeId,
          employeeEmail,
          programType,
          activities: [],
          unlockedLevels: [0]
        }
      },
      { upsert: true, new: true }
    );

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

export const unlockLevel = async (req, res) => {
  try {
    const { programType, unlockedLevel } = req.body;
    const employeeId = req.employee.id;
    const employeeEmail = req.employee.email;

    let progress = await ProgramTrackerTracking.findOne({
      employeeId,
      employeeEmail,
      programType
    });

    if (!progress) {
      progress = new ProgramTrackerTracking({
        employeeId,
        employeeEmail,
        programType,
        unlockedLevels: [0]
      });
    }

    if (!progress.unlockedLevels.includes(unlockedLevel)) {
      progress.unlockedLevels.push(unlockedLevel);
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
    const { programType } = req.query;

    const progress = await ProgramTrackerTracking.findOne({
      employeeId,
      programType  
    });

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
