require('../src/db/mongoose');
const User = require('../src/models/user');

// Async Await method
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {
        age
    });
    const count = await user.countDocuments({
        age
    });
    return count;
}

updateAgeAndCount('60c48b0a445fa274b87aaf7d',23).then((result) => {
    console.log({result})
}).catch((e) => {
    console.log({e})
})

// Promise Chaining Method
// User.findByIdAndUpdate('60c48b0a445fa274b87aaf7d', {
//     age: 1
// }).then((user) => {
//     console.log(user);
//     return User.countDocuments({
//         age: 1
//     });
// }).then((result) => {
//     console.log({
//         result
//     });
// }).catch((e) => {
//     console.log({
//         e
//     })
// })