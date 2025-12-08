const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    budgetType: { type: String, enum: ['fixed', 'hourly'], required: true },
    category: { type: String, required: true },
    duration: { type: String },
    skills: [{ type: String }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open', 'in_progress', 'completed', 'cancelled'], default: 'open' },
    proposalsCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    deadline: { type: Date }
});
module.exports = mongoose.model('Project', projectSchema);