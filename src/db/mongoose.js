const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// Drop Database
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', function () {
//     mongoose.connection.db.dropDatabase();
// }, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const taskSchema = {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default : false,
//     }
// };

// const Task = mongoose.model('Task', taskSchema)
// const demo = new Task({
//     description: 'task 5',
//     completed: false
// });

// demo.save().then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.log('Error', error)
// })























// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('EMail is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         trim: true,
//         // To check minimum length can use  minlength : 7 also 
//         validate(value) {
//             if (!validator.isLength(value, {
//                     min: 6
//                 })) {
//                 throw new Error('Password length should be greater than 6')
//             }
//             else if(validator.equals(value.toLowerCase(), 'password'))
//             {
//                 throw new Error('Password cannot be `password`')   
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             /* Custom validation created to check age is not negative*/
//             if (value < 0) {
//                 throw new Error('Age should not be negative')
//             }
//         },
//         default: 0
//     }
// })
// const me = new User({
//     name: 'Krishna',
//     email: 'krk@gmail.com',
//     password: 'adfhasjk',
//     age: 25
// })

// me.save().then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.log('error', error)
// })