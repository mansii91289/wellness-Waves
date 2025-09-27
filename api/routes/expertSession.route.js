
// import express from 'express';
// import { bookExpertSession, getExpertSessions, cancelExpertSession } from '../controllers/expertSession.controller.js';
// import { verifyToken } from '../utils/verifyemployee.js';

// const router = express.Router();

// router.post('/book', verifyToken, bookExpertSession);
// router.get('/employee/:employeeEmail', verifyToken, getExpertSessions);
// router.post('/cancel/:employeeEmail', verifyToken, cancelExpertSession);

// export default router;
import express from 'express';
import { bookExpertSession, getExpertSessions, cancelExpertSession, checkSlotAvailability } from '../controllers/expertSession.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/book', verifyToken, bookExpertSession);
router.get('/employee/:employeeEmail', verifyToken, getExpertSessions);
router.post('/cancel/:employeeEmail', verifyToken, cancelExpertSession);
router.get('/check-availability/:expertEmail/:sessionDate/:startTime', checkSlotAvailability);

export default router;
