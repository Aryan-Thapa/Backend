const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userAuth");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const saltRounds = 10;

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // Store hash in your password DB.
      let createdUser = await userModel.create({
        username: username,
        email: email,
        password: hash,
      });
      let token = jwt.sign({ email: email }, "secret");
      res.cookie("token", token);
      res.redirect("/");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email }, "secret");
      res.cookie("token", token);
      return res.status(200).send("login successful");
    } else {
      return res.status(400).send("Invalid password");
    }
  });
});

app.get("logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
