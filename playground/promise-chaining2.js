require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('60c59ee4dbdf9e4f1cbc8b30').then((task) => {
    console.log(task);
    return Task.countDocuments({
        completed: false
    })
}).then((result) => {
    console.log({
        result
    });
}).catch((e) => {
    console.log({
        e
    })
})