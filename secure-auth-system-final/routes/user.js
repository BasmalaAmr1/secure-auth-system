const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');
const bcrypt = require('bcryptjs');

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/profile', authMiddleware, async (req, res) => {
    const { email, password } = req.body;
    const userFields = {};
    if (email) userFields.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
    }

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        user = await User.findByIdAndUpdate(req.user.id, { $set: userFields }, { new: true });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id/role', authMiddleware, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        user.role = req.body.role || user.role;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
