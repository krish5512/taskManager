const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); /* automatically parse all the data into json */


app.post("/post", (req, res) => {
  console.log("Connected to React Hello Krishna");
  res.redirect("/");
});
// Methods to read data from DB
// User Related
app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send({
      users
    })
  }).catch((e) => {
    res.status(500).send()
  })
});
app.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user)
  }).catch((e) => {
    res.status(500).send(e)
  })
});
// Task Related 
app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks);
  }).catch((e) => {
    res.status(500).send(e);
  })
})
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  }).catch((e) => {
    res.status(500).send(e)
  })
})
// Methods to write data into DB
// User Related
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    res.send(user)
  }).catch((e) => {
    res.status(400).send(e);
  })
})

// Task Related
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save().then(() => {
    res.status(201).send(task)
  }).catch((e) => {
    res.status(400).send(e);
  })
})


/*******************************************************/
app.listen(port, () => {
  console.log('The server is up at ' + port)
})