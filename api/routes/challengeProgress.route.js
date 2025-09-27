
import express from 'express';
import { updateProgress, getProgress, unlockDay } from '../controllers/challengeProgress.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/challengeprogresstracking/update', verifyToken, updateProgress);
router.get('/challengeprogresstracking', verifyToken, getProgress);
router.post('/challengeprogresstracking/unlockday', verifyToken, unlockDay);

export default router;
