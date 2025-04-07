const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ name: "Aryan" }, "secret");
  res.cookie("token", token);
  res.send("server is running");
});

app.get("/read", (req, res) => {
  const data = jwt.verify(req.cookies.token, "secret");
  console.log("jwt:", req.cookies.token);
  console.log("data:", data);
  res.send("token read successfully");
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
