
import express from 'express';
import { verifyToken } from '../utils/verifyemployee.js';
import { 
  createProgram,
  getPrograms, 
  updateProgress,
  deleteProgram
} from '../controllers/program.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createProgram);
router.get('/', verifyToken, getPrograms);
router.put('/:programId/progress', verifyToken, updateProgress);
router.delete('/:programId', verifyToken, deleteProgram);

export default router;
