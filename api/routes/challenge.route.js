
import express from 'express';
import { joinChallenge, getChallenges } from '../controllers/challenge.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/join', verifyToken, joinChallenge);
router.get('/', verifyToken, getChallenges);

export default router;
