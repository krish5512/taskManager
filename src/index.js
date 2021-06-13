const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); /* automatically parse all the data into json */


app.post("/post", (req, res) => {
  console.log("Connected to React Hello Krishna");
  res.redirect("/");
});

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    res.send(user)
  }).catch((e) => {
    res.status(400).send(e);
  })
})


app.listen(port, () => {
  console.log('The server is up at ' + port)
})