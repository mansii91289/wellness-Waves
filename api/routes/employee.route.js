
// import express from 'express';
// import { deleteEmployee, test, updateEmployee, getEmployee, uploadAvatar } from '../controllers/employee.controller.js';
// import { verifyToken } from '../utils/verifyemployee.js';
// import multer from 'multer';
// import path from 'path';

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append extension
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only image files are allowed!'));
//   }
// });

// router.get('/test', test);

// // ✅ Ensure authentication is required for profile access
// router.get("/profile", verifyToken, getEmployee); 

// router.put('/update/:id', verifyToken, updateEmployee);
// router.delete('/delete/:id', verifyToken, deleteEmployee);
// router.get('/:id', verifyToken, getEmployee);

// // New route for avatar uploads
// router.post('/upload-avatar', verifyToken, upload.single('avatar'), uploadAvatar);

// export default router;
import express from 'express';
import { deleteEmployee, test, updateEmployee, getEmployee, uploadAvatar } from '../controllers/employee.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
  }
});

// Middleware to handle multer errors
const uploadMiddleware = upload.single('avatar');

const handleUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  next();
};

router.get('/test', test);

// ✅ Ensure authentication is required for profile access
router.get("/profile", verifyToken, getEmployee); 

router.put('/update/:id', verifyToken, updateEmployee);
router.delete('/delete/:id', verifyToken, deleteEmployee);
router.get('/:id', verifyToken, getEmployee);

// New route for avatar uploads
router.post('/upload-avatar', verifyToken, uploadMiddleware, handleUpload, uploadAvatar);

export default router;