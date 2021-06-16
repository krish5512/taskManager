const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); /* automatically parse all the data into json */

// CRUD Operations

app.post("/post", (req, res) => {
  console.log("Connected to React Hello Krishna");
  res.redirect("/");
});
// Methods to read data from DB
// User Related
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send({
      users
    })
  } catch (e) {
    res.status(500).send(e);
  }
});
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
});
// Task Related 
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
})
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})
// Methods to write data into DB
// User Related
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e);
  }

})
// Task Related
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e);
  }
})
// Mehtods to udpate and patch the data in DB
// Users Related
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdate = ['name', 'email', 'age', 'password'];
  const checkVali = updates.every(update => allowedUpdate.includes(update));
  if (checkVali) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      res.status(400).send(e)
    }
  } else {
    return res.status(400).send({
      error: 'Invalid Update'
    })
  }
})
// Task Related
app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ['description', 'completed'];
  const checkValidation = updates.every(update => allowedUpdate.includes(update));
  if (checkValidation) {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!task) {
        return res.status(404).send();
      }
      res.send(task)
    } catch (e) {
      res.status(400).send(res)
    }
  } else {
    return res.status(400).send({
      error: 'Invalid Update'
    })
  }
})
/*******************************************************/
app.listen(port, () => {
  console.log('The server is up at ' + port)
})