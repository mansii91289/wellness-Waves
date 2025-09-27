
import express from 'express';
import { updateLineChartData, getLineChartData } from '../controllers/lineChart.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';

const router = express.Router();

router.post('/update', verifyToken, updateLineChartData);
router.get('/', verifyToken, getLineChartData);

export default router;
