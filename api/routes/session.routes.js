import express from 'express';
import { bookLiveSession, bookExpertSession } from '../controllers/session.controller.js';

const router = express.Router();

router.post('/book-live', bookLiveSession);
router.post('/book-session', bookExpertSession);

export default router;