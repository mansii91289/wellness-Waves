// routes/dashboardRoutes.js
const express = require('express');
const Dashboard = require('../models/Dashboard');
const router = express.Router();

// GET dashboard data
router.get('/', async (req, res) => {
  try {
    const dashboardData = await Dashboard.findOne().sort({ createdAt: -1 });
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new dashboard data (for testing/creation)
router.post('/', async (req, res) => {
  try {
    const newDashboard = new Dashboard(req.body);
    const savedDashboard = await newDashboard.save();
    res.status(201).json(savedDashboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
