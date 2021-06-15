require('../src/db/mongoose');
const User = require('../src/models/user');


User.findByIdAndUpdate('60c48b0a445fa274b87aaf7d',{age : 1}).then((user) => {
    console.log(user);
    return User.countDocuments({ age : 1});
}).then((result) => {
    console.log({result});
}).catch((e) => {
    console.log({e})
})