const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); /* automatically parse all the data into json */
app.use(userRouter);
app.use(taskRouter);

app.post("/post", (req, res) => {
  console.log("Connected to React Hello Krishna");
  res.redirect("/");
});
/*******************************************************/
app.listen(port, () => {
  console.log('The server is up at ' + port)
})