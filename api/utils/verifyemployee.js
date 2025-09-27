
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Employee from '../models/employee.model.js';

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findById(decoded.id);

    if (!employee) {
      return res.status(401).json({ message: "Unauthorized: Employee does not exist" });
    }

    req.employee = employee; // Attach full employee object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import Employee from '../models/employee.model.js';

// dotenv.config();

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const employee = await Employee.findById(decoded.id).select('-password');

//     if (!employee) {
//       return res.status(401).json({ message: "Unauthorized: Employee not found" });
//     }

//     if (!employee.verified) {
//       return res.status(401).json({ message: "Unauthorized: Email not verified" });
//     }

//     req.employee = employee;
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: "Unauthorized: Token expired" });
//     }
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

