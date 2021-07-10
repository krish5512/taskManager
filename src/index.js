const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
const app = express();
const port = process.env.PORT || 3001;

// To add the library to upload the file to database
const multer = require('multer');
const upload = multer({
  dest: 'images',
});

app.post('/upload',upload.single('upload'), (req, res) => {
  res.send();
})



app.use(express.json()); /* automatically parse all the data into json */
app.use(userRouter);
app.use(taskRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.listen(port, () => {
  console.log('The server is up at ' + port)
})



//******************************************************************************************* */


// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async () => {
//   // const task = await Task.findById('60d18b0abedd7a7260d36031');
//   // await task.populate('owner').execPopulate()

//   const user = await User.findById('60d1892229322e1f24442900');
//   await user.populate('tasks').execPopulate();
//    console.log(
//     user.tasks
//   );
// }

// main()




// app.use((req, res, next) => {
//   console.log(
//     req.method, req.path
//   )

//   if (req.method !== 'GET') {
//     next();
//   } else {
//     res.send('GET REqeust are disabled')
//   }
// })

// app.use((req, res, next) => {
//   if (req.method) {
//     res.status(503).send("Site is under maintainence")
//   }
// })



// const jwt = require('jsonwebtoken');
// const myFucntion = async () => {
//   const token = jwt.sign({
//     _id: 'abc123'
//   }, 'thisIsMyNewCourse', {
//     expiresIn: '1 seconds'
//   });
// }

// myFucntion()
/*******************************************************/