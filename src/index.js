const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.post("/post", (req, res) => {
    console.log("Connected to React Hello Krishna");
    res.redirect("/");
  });

app.listen(port, () => {
    console.log('The server is up at ' + port)
})