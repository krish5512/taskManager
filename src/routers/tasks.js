const express = require('express')
const router = new express.Router();
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();
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
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdate = ['description', 'completed'];
    const checkValidation = updates.every(update => allowedUpdate.includes(update));
    if (checkValidation) {
        try {
            // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            //     new: true,
            //     runValidators: true
            // });
            const task = await Task.findByIdAndUpdate(req.params.id);
            updates.forEach((update) => user[update] = req.body[update]);
            await task.save();
            if (!task) {
                return res.status(404).send();
            }
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
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(res)
    }
})

module.exports = router;