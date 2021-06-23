const express = require('express')
const router = new express.Router();
const auth = require('../middleware/auth')
const Task = require('../models/task')

// Get /tasks?completed=true
// Get /tasks?limit=10&skip20
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    if (req.query.completed === 'true') {
        match.completed = req.query.completed === 'true';
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                /*this is being used to set the number of result limit to be shown*/
                skip: parseInt(req.query.skip)
                /*this is being used to skip result count to be shown to the next set*/

            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
// Task Related
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e);
    }
})
// Mehtods to update and patch the data in DB
// Users Related

// Task Related
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdate = ['description', 'completed'];
    const checkValidation = updates.every(update => allowedUpdate.includes(update));
    if (checkValidation) {
        try {
            const task = await Task.findOne({
                _id: req.params.id,
                owner: req.user._id
            });
            if (!task) {
                return res.status(404).send();
            }
            updates.forEach((update) => user[update] = req.body[update]);
            await task.save();
            res.send(task)
        } catch (e) {
            res.status(500).send(res)
        }
    } else {
        return res.status(400).send({
            error: 'Invalid Update'
        })
    }
})
// Mehtods to delete the data in DB
// Users Related


// Task Related
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(res)
    }
})

module.exports = router;