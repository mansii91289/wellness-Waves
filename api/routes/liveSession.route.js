import express from 'express';
import { verifyToken } from '../utils/verifyemployee.js';
import { bookLiveSession, getLiveSessions, cancelLiveSession } from '../controllers/liveSession.controller.js';

const router = express.Router();

// Book a new session
router.post('/book', verifyToken, bookLiveSession);

// Get sessions for an employee
router.get('/:employeeEmail', verifyToken, getLiveSessions);

// Cancel a session
router.post('/:employeeEmail/cancel/:sessionId', verifyToken, cancelLiveSession);

export default router;