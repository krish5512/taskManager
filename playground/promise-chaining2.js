require('../src/db/mongoose');
const Task = require('../src/models/task');

// Async Await method 

const taskCheckMethod = async (_id) => {
    await Task.findByIdAndDelete(_id);
    const taskCount = await Task.countDocuments({
        completed: false
    });
    return taskCount;
}

taskCheckMethod('60c59ee4dbdf9e4f1cbc8b30').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error)
})

// Promise Chaining method
// Task.findByIdAndDelete('60c59ee4dbdf9e4f1cbc8b30').then((task) => {
//     console.log(task);
//     return Task.countDocuments({
//         completed: false
//     })
// }).then((result) => {
//     console.log({
//         result
//     });
// }).catch((e) => {
//     console.log({
//         e
//     })
// })