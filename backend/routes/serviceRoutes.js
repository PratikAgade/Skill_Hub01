const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) query.title = { $regex: search, $options: 'i' };
        const services = await Service.find(query).populate('freelancer', 'name avatar rating');
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('freelancer', 'name bio avatar rating reviews');
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'freelancer') {
        return res.status(403).json({ message: 'Only freelancers can create services' });
    }
    try {
        const service = new Service({ ...req.body, freelancer: req.user.id });
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ message: 'Error creating service', error: err.message });
    }
});
router.put('/:id', auth, async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        if (service.freelancer.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        if (service.freelancer.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await service.deleteOne();
        res.json({ message: 'Service removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
module.exports = router;