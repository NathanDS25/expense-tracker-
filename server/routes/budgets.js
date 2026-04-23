const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Get all budgets and return as a key-value object (category: amount)
router.get('/', async (req, res) => {
  try {
    const budgetsArray = await Budget.find();
    const budgetsObj = {};
    budgetsArray.forEach(b => {
      budgetsObj[b.category] = b.amount;
    });
    // Default budgets if empty
    if (Object.keys(budgetsObj).length === 0) {
      return res.json({ 'Food': 500, 'Transport': 200, 'Shopping': 300 });
    }
    res.json(budgetsObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create budgets from an object
router.post('/update', async (req, res) => {
  try {
    const newBudgets = req.body; // e.g., { 'Food': 600, 'Transport': 250 }
    for (const [category, amount] of Object.entries(newBudgets)) {
      await Budget.findOneAndUpdate(
        { category },
        { amount },
        { upsert: true, new: true }
      );
    }
    res.json({ message: 'Budgets updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
