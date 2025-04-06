const express = require("express");
const app = express();

//parsers for FORM data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set("view engine","ejs");

// app.use("/", (req, res) => {
//     res.render("index");
// })

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", (req, res) => {
  res.send("Chal raha hai");
});

app.get("/profile/:username", (req, res) => {
  res.send(`Hi, ${req.params.username}`);
});

app.get("/profile/:username/:age", (req, res) => {
  res.send(`Hi, ${req.params.username} of age ${req.params.age}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
