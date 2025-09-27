
import express from 'express';
import { updateBarChartData, getBarChartData } from '../controllers/barChart.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/update', verifyToken, updateBarChartData);
router.get('/', verifyToken, getBarChartData);

export default router;
