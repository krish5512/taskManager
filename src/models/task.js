const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task
// const demo = new Task({
//     description: 'task 5',
//     completed: false
// });

// demo.save().then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.log('Error', error)
// })