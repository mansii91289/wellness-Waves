
// import bcryptjs from 'bcryptjs';
// import Employee from '../models/employee.model.js';
// import { errorHandler } from '../utils/error.js';
// import fs from 'fs';
// import path from 'path';

// export const test = (req, res) => {
//   res.json({
//     message: 'Api route is working!',
//   });
// };

// export const updateEmployee = async (req, res, next) => {
//   try {
//     if (req.employee.id !== req.params.id) {
//       return res.status(401).json({ message: "You can only update your own account!" });
//     }

//     let updateFields = {};
    
//     if (req.body.username) updateFields.username = req.body.username;
//     if (req.body.email) updateFields.email = req.body.email;
//     if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
//     if (req.body.role) updateFields.role = req.body.role;
//     if (req.body.employeeId) updateFields.employeeId = req.body.employeeId;
//     if (req.body.department) updateFields.department = req.body.department;
//     if (req.body.avatar) updateFields.avatar = req.body.avatar;
//     if (req.body.credits) updateFields.credits = req.body.credits;
    
//     if (req.body.password) {
//       updateFields.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateFields },
//       { new: true }
//     ).select("-password");

//     if (!updatedEmployee) {
//       return res.status(404).json({ message: "Employee not found!" });
//     }

//     res.status(200).json(updatedEmployee);
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(500).json({ message: "Server error!", error: error.message });
//   }
// };

// export const deleteEmployee = async (req, res, next) => {
//   if (req.employee.id !== req.params.id)
//     return next(errorHandler(401, 'You can only delete your own account!'));
//   try {
//     await Employee.findByIdAndDelete(req.params.id);
//     res.clearCookie('access_token');
//     res.status(200).json('Employee has been deleted!');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.employee.id).select("-password");
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     res.status(200).json({ 
//       employee: {
//         _id: employee._id,
//         username: employee.username,
//         email: employee.email,
//         role: employee.role,
//         phoneNumber: employee.phoneNumber,
//         employeeId: employee.employeeId,
//         department: employee.department,
//         avatar: employee.avatar,
//         credits: employee.credits || 0
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const uploadDir = path.join(process.cwd(), 'uploads');
//     if (!fs.existsSync(uploadDir)){
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     const updatedEmployee = await Employee.findByIdAndUpdate(req.employee.id, {
//       avatar: fileUrl
//     }, { new: true }).select("-password");

//     if (!updatedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.status(200).json({ 
//       message: 'Profile photo uploaded successfully',
//       url: fileUrl,
//       employee: updatedEmployee
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Error uploading file', error: error.message });
//   }
// };
import bcryptjs from 'bcryptjs';
import Employee from '../models/employee.model.js';
import { errorHandler } from '../utils/error.js';
import fs from 'fs';
import path from 'path';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateEmployee = async (req, res, next) => {
  try {
    if (req.employee.id !== req.params.id) {
      return res.status(401).json({ message: "You can only update your own account!" });
    }

    let updateFields = {};
    
    if (req.body.username) updateFields.username = req.body.username;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
    if (req.body.role) updateFields.role = req.body.role;
    if (req.body.employeeId) updateFields.employeeId = req.body.employeeId;
    if (req.body.department) updateFields.department = req.body.department;
    if (req.body.avatar) updateFields.avatar = req.body.avatar;
    if (req.body.credits) updateFields.credits = req.body.credits;
    
    if (req.body.password) {
      updateFields.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

export const deleteEmployee = async (req, res, next) => {
  if (req.employee.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('Employee has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ 
      employee: {
        _id: employee._id,
        username: employee.username,
        email: employee.email,
        role: employee.role,
        phoneNumber: employee.phoneNumber,
        employeeId: employee.employeeId,
        department: employee.department,
        avatar: employee.avatar,
        credits: employee.credits || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const updatedEmployee = await Employee.findByIdAndUpdate(req.employee.id, {
      avatar: fileUrl
    }, { new: true }).select("-password");

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ 
      message: 'Profile photo uploaded successfully',
      url: fileUrl,
      employee: updatedEmployee
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};