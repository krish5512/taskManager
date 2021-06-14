const mongoose = require('mongoose');
const validator = require('validator');

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// });

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('EMail is invalid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        // To check minimum length can use  minlength : 7 also 
        validate(value) {
            if (!validator.isLength(value, {
                    min: 6
                })) {
                throw new Error('Password length should be greater than 6')
            } else if (validator.equals(value.toLowerCase(), 'password')) {
                throw new Error('Password cannot be `password`')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            /* Custom validation created to check age is not negative*/
            if (value < 0) {
                throw new Error('Age should not be negative')
            }
        },
        default: 0
    }
})
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

module.exports = User;