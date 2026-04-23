const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true, default: 0 },
  deadline: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);
