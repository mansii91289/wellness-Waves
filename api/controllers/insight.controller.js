
import Insight from '../models/insight.model.js';

export const submitInsight = async (req, res) => {
  try {
    const { answers } = req.body;
    const employeeId = req.employee.id;
    const employeeEmail = req.employee.email;

    const insight = new Insight({
      employeeId,
      employeeEmail,
      answers: answers.map((answer, index) => ({
        question: `Question ${index + 1}`,
        selectedOption: answer.selectedOption,
        customAnswer: answer.customAnswer
      }))
    });

    await insight.save();
    res.status(201).json({ success: true, message: "Insights saved successfully" });
  } catch (error) {
    console.error("Error saving insights:", error);
    res.status(500).json({ success: false, message: "Failed to save insights" });
  }
};
export const getLastSubmission = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    const lastInsight = await Insight.findOne({ employeeId })
      .sort({ submittedAt: -1 })
      .select('submittedAt');
    
    res.json({ success: true, lastSubmission: lastInsight?.submittedAt });
  } catch (error) {
    console.error("Error fetching last submission:", error);
    res.status(500).json({ success: false, message: "Failed to fetch last submission" });
  }
};
