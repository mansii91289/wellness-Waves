
import express from 'express';
import { submitInsight, getLastSubmission } from '../controllers/insight.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/submit', verifyToken, submitInsight);
router.get('/last-submission', verifyToken, getLastSubmission);

export default router;
