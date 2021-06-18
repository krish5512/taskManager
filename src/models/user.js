const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
        },

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
});

userSchema.pre('save', async function (next) {
    const user = this;
    console.log({user});
    console.log(user.isModified('password'))
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    console.log('just before saving');
    next();
})

const User = mongoose.model('User', userSchema);


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