
// import Employee from '../models/employee.model.js';
// import CreditTransaction from '../models/credit.model.js';

// export const getCreditBalance = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.employee.id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     res.status(200).json({ credits: employee.credits });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching credits", error: error.message });
//   }
// };

// export const spendCredits = async (req, res) => {
//   try {
//     const { amount, description, currentBalance } = req.body;
    
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     const employee = await Employee.findById(req.employee.id);
    
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
    
//     // Double check both client and server side balance
//     if (employee.credits < amount || currentBalance < amount) {
//       return res.status(400).json({ message: "Insufficient credits" });
//     }
    
//     // Create transaction record
//     const transaction = new CreditTransaction({
//       userId: employee._id,
//       amount,
//       type: 'debit',
//       description
//     });
    
//     // Update employee credits
//     employee.credits -= amount;
    
//     // Save both changes in a transaction
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//       await transaction.save({ session });
//       await employee.save({ session });
//       await session.commitTransaction();
      
//       res.status(200).json({ 
//         message: "Credits spent successfully",
//         newBalance: employee.credits,
//         transaction: transaction
//       });
//     } catch (error) {
//       await session.abortTransaction();
//       throw error;
//     } finally {
//       session.endSession();
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error spending credits", error: error.message });
//   }
// };

// export const addCredits = async (req, res) => {
//   try {
//     const { amount, description } = req.body;
//     const employee = await Employee.findById(req.employee.id);
    
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
    
//     const transaction = new CreditTransaction({
//       userId: employee._id,
//       amount,
//       type: 'credit',
//       description
//     });
    
//     employee.credits += amount;
    
//     await Promise.all([transaction.save(), employee.save()]);
    
//     res.status(200).json({ 
//       message: "Credits added successfully",
//       newBalance: employee.credits,
//       transaction: transaction
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding credits", error: error.message });
//   }
// };
