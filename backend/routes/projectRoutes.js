const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Proposal = require('../models/Proposal');
const auth = require('../middleware/auth');
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ status: 'open' }).populate('client', 'name avatar');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/my-projects', auth, async (req, res) => {
    if (req.user.role !== 'client') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const projects = await Project.find({ client: req.user.id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('client', 'name avatar');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'client') {
        return res.status(403).json({ message: 'Only clients can post projects' });
    }
    try {
        const project = new Project({ ...req.body, client: req.user.id });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ message: 'Error creating project', error: err.message });
    }
});
router.put('/:id', auth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.client.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.client.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/:id/proposals', auth, async (req, res) => {
    if (req.user.role !== 'freelancer') {
        return res.status(403).json({ message: 'Only freelancers can submit proposals' });
    }
    try {
        const proposal = new Proposal({
            ...req.body,
            project: req.params.id,
            freelancer: req.user.id
        });
        await proposal.save();
        await Project.findByIdAndUpdate(req.params.id, { $inc: { proposalsCount: 1 } });
        res.status(201).json(proposal);
    } catch (err) {
        res.status(400).json({ message: 'Error submitting proposal' });
    }
});
module.exports = router;