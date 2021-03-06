const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')
// Hash the plain text password
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
},{
    timestamps : true
});
// Virtual Property is used to create relationship between 2 entities and is not a database property 
// and allow to set virtual attribute
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
    /* This is used to find the field on both collection to create a relation*/
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({
        owner: user_id
    })
    next();
})



// this is on actual and uppercase User model 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user;
}
// this is on instances and individual user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, 'thisIsMyNewCourse');
    user.tokens = user.tokens.concat({
        token
    });
    await user.save();
    return token;
}
// this converts the user object to json so that it can be manipulated
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    console.log({
        userObject
    })
    delete userObject.password;
    delete userObject.tokens;
    console.log({
        userObject
    })
    return userObject;
}
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;

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