const express = require('express')
const router = new express.Router();
const Task = require('../models/task')

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
// Methods to write data into DB
// User Related

// Task Related
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
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