const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World!");
  });
    
app.post("/post", (req, res) => {
    console.log("Connected to React Hello Krishna");
    res.redirect("/");
  });
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(port, () => {
    console.log('The server is up at ' + port)
})