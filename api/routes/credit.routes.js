
// import express from 'express';
// import { verifyToken } from '../middleware/verifyemployee.js';
// import Employee from '../models/employee.model.js';

// const router = express.Router();

// // Get current credits
// router.get('/credits', verifyToken, async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.employee._id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     res.json({ credits: employee.credits });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching credits" });
//   }
// });

// // Update credits
// router.put('/credits/update', verifyToken, async (req, res) => {
//   try {
//     const { credits } = req.body;
//     if (typeof credits !== 'number' || credits < 0) {
//       return res.status(400).json({ message: "Invalid credits value" });
//     }

//     const employee = await Employee.findByIdAndUpdate(
//       req.employee._id,
//       { $set: { credits: credits }},
//       { new: true }
//     );

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.json({ success: true, credits: employee.credits });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating credits" });
//   }
// });

// export default router;

import express from 'express';
import { getCredits, updateCredits } from '../controllers/credit.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

// Get current credits balance
router.get('/api/credits/balance', verifyToken, getCredits);

// Update credits balance
router.post('/api/credits/update', verifyToken, updateCredits);

export default router;