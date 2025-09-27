
// import express from 'express';
// import { updateProgress, getProgress } from '../controllers/programProgress.controller.js';
// import { verifyToken } from '../utils/verifyemployee.js';

// const router = express.Router();

// router.post('/update', verifyToken, updateProgress);
// router.get('/', verifyToken, getProgress);

// export default router;

import express from 'express';
import { updateProgress, getProgress } from '../controllers/programProgress.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/update', verifyToken, updateProgress);
router.get('/', verifyToken, getProgress);
router.get('/:email', verifyToken, getProgress);

export default router;
