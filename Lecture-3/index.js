const express = require("express");
const app = express();

//routes creation
app.get("/", (req, res) => {
  res.send("Hello World Jiiii");
});

app.get("/about", (req, res) => {
  res.send("About Page lol");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
