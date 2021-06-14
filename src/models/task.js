const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default : false,
    }
};

const Task = mongoose.model('Task', taskSchema)
// const demo = new Task({
//     description: 'task 5',
//     completed: false
// });

// demo.save().then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.log('Error', error)
// })

module.exports = Task