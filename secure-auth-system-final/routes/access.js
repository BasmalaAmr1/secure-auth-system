const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Middleware to check roles
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        next();
    };
};

router.get('/public', (req, res) => {
    res.json({ msg: 'This is a public route' });
});

router.get('/protected', auth, (req, res) => {
    res.json({ msg: 'This is a protected route' });
});

router.get('/moderator', auth, checkRole(['moderator', 'admin']), (req, res) => {
    res.json({ msg: 'This route is for moderators and admins' });
});

router.get('/admin', auth, checkRole(['admin']), (req, res) => {
    res.json({ msg: 'This route is for admins only' });
});

module.exports = router;