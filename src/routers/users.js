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
router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
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
        req.user.token = req.user.tokens.filter((token) => {
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

router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'age', 'password'];
    const checkVali = updates.every(update => allowedUpdate.includes(update));
    if (checkVali) {
        try {
            //    Find exact update document field
            const user = await User.findByIdAndUpdate(req.params.id);

            updates.forEach((update) => user[update] = req.body[update])
            await user.save()
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        return res.status(400).send({
            error: 'Invalid Update'
        })
    }
})
router.delete('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(res)
    }
})


module.exports = router;