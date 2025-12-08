const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ balance: user.balance, transactions });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/deposit', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.id);
        user.balance += Number(amount);
        await user.save();
        const transaction = new Transaction({
            user: req.user.id,
            type: 'deposit',
            amount,
            status: 'completed',
            description: 'Deposit via Bank Transfer'
        });
        await transaction.save();
        res.json({ message: 'Deposit successful', balance: user.balance, transaction });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/withdraw', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.id);
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        user.balance -= amount;
        await user.save();
        const transaction = new Transaction({
            user: req.user.id,
            type: 'withdrawal',
            amount,
            status: 'completed',
            description: 'Withdrawal to bank account'
        });
        await transaction.save();
        res.json({ message: 'Withdrawal successful', balance: user.balance, transaction });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/purchase', auth, async (req, res) => {
    try {
        const { serviceId, freelancerId, amount } = req.body;
        const user = await User.findById(req.user.id);
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        user.balance -= Number(amount);
        await user.save();
        await new Transaction({
            user: req.user.id,
            type: 'payment',
            amount,
            status: 'completed',
            description: `Purchased service: ${serviceId}`
        }).save();
        const Order = require('../models/Order');
        const order = new Order({
            client: req.user.id,
            freelancer: freelancerId,
            service: serviceId,
            amount,
            status: 'active'
        });
        await order.save();
        res.json({ message: 'Purchase successful', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Purchase failed' });
    }
});
module.exports = router;