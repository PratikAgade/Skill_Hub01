const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Proposal = require('../models/Proposal');
const Service = require('../models/Service');
router.get('/freelancer/stats', auth, async (req, res) => {
    if (req.user.role !== 'freelancer') return res.status(403).json({ message: 'Access denied' });
    try {
        const user = await require('../models/User').findById(req.user.id);
        const activeProjects = await Proposal.countDocuments({ freelancer: req.user.id, status: 'accepted' });
        const proposalsSent = await Proposal.countDocuments({ freelancer: req.user.id });
        const earnings = user.balance;
        res.json({
            earnings,
            activeProjects,
            proposalsSent,
            successScore: 98  
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/freelancer/active-projects', auth, async (req, res) => {
    if (req.user.role !== 'freelancer') return res.status(403).json({ message: 'Access denied' });
    try {
        const proposals = await Proposal.find({ freelancer: req.user.id, status: 'accepted' })
            .populate({
                path: 'project',
                populate: { path: 'client', select: 'name' }
            })
            .sort({ updatedAt: -1 });
        const activeProjects = proposals.map(p => ({
            _id: p.project._id,
            title: p.project.title,
            client: p.project.client.name,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),  
            status: 'In Progress',
            progress: 0  
        }));
        res.json(activeProjects);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/client/stats', auth, async (req, res) => {
    if (req.user.role !== 'client') return res.status(403).json({ message: 'Access denied' });
    try {
        const activeJobs = await Project.countDocuments({ client: req.user.id, status: 'open' });
        const Transaction = require('../models/Transaction');
        const totalSpent = await Transaction.aggregate([
            { $match: { user: new require('mongoose').Types.ObjectId(req.user.id), type: 'payment' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        res.json({
            totalSpent: totalSpent[0]?.total || 0,
            activeJobs,
            newProposals: await Proposal.countDocuments({ status: 'pending' }),  
            avgHourlyRate: 45
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;