const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingsGoal');

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await SavingsGoal.find();
    const formatted = goals.map(g => ({
      id: g._id.toString(),
      name: g.name,
      targetAmount: g.targetAmount,
      currentAmount: g.currentAmount,
      deadline: g.deadline
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a goal
router.post('/', async (req, res) => {
  const goal = new SavingsGoal({
    name: req.body.name,
    targetAmount: req.body.targetAmount,
    currentAmount: req.body.currentAmount || 0,
    deadline: req.body.deadline
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json({
      id: newGoal._id.toString(),
      name: newGoal.name,
      targetAmount: newGoal.targetAmount,
      currentAmount: newGoal.currentAmount,
      deadline: newGoal.deadline
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a goal (e.g. currentAmount)
router.put('/:id', async (req, res) => {
  try {
    const updated = await SavingsGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      id: updated._id.toString(),
      name: updated.name,
      targetAmount: updated.targetAmount,
      currentAmount: updated.currentAmount,
      deadline: updated.deadline
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    await SavingsGoal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
