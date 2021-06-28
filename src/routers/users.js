const express = require('express')
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const {
    findByIdAndUpdate
} = require('../models/user');

router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({});
    //     res.send({
    //         users
    //     })
    // } catch (e) {
    //     res.status(500).send(e);
    // }
    res.send(req.user);
});
// Sign Up Route
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(500).send(e);
    }
})
// login Route
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send();
    }
})
// Logout 
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.send({
            message: 'User Logout successful'
        });
    } catch (e) {
        res.status(500).send();
    }
})
// LogoutAll
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({
            message: 'All session Logout successful'
        });
    } catch (e) {
        res.status(500).send();
    }
})
// Update the profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'age', 'password'];
    const checkVali = updates.every(update => allowedUpdate.includes(update));
    if (checkVali) {
        try {
            //    Find exact update document field
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user);
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        return res.status(400).send({
            error: 'Invalid Update'
        })
    }
})
// Delete the profile of you own
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send(res)
    }
})


module.exports = router;