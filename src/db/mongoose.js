const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const taskSchema = {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    }
};

const Task = mongoose.model('Task', taskSchema)
const demo = new Task({
    description: 'task 5',
    completed: false
});

demo.save().then((result) => {
    console.log('Success', result)
}).catch((error) => {
    console.log('Error', error)
})























// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })





// const me = new User({
//     name: 'Krishna',
//     age: 25
// })

// me.save().then((result) => {
//     console.log('Success',result)
// }).catch((error) => {
//     console.log('error', error)
// })