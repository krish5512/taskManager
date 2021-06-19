const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
const app = express();
const port = process.env.PORT || 3001;

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

app.use(express.json()); /* automatically parse all the data into json */
app.use(userRouter);
app.use(taskRouter);

app.post("/post", (req, res) => {
  console.log("Connected to React Hello Krishna");
  res.redirect("/");
});

const jwt = require('jsonwebtoken');
const myFucntion = async () => {
  const token = jwt.sign({
    _id: 'abc123'
  }, 'thisIsMyNewCourse', {
    expiresIn: '1 seconds'
  });
}

myFucntion()
/*******************************************************/
app.listen(port, () => {
  console.log('The server is up at ' + port)
})