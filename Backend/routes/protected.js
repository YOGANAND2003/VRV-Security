const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');
const rbac = require('../middlewares/rbac');
const router = express.Router();



router.get('/dashboard', verifyJWT, (req, res) => {
    res.send(`Welcome ${req.user.role}`);
});

router.get('/admin', verifyJWT, rbac(['Admin']), (req, res) => {
    res.send('Admin Dashboard');
});

module.exports = router;
