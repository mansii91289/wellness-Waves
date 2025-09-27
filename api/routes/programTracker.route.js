
import express from 'express';
import { updateProgress, getProgress, unlockLevel } from '../controllers/programTracker.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/programtracker/update', verifyToken, updateProgress);
router.get('/programtracker', verifyToken, getProgress);
router.post('/programtracker/unlocklevel', verifyToken, unlockLevel);

export default router;
