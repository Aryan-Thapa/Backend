const express = require("express");
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    return res.status(400).send("User already exists");
  } else {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = await userModel.create({
          username: username,
          email: email,
          password: hash,
        });
        let token = jwt.sign({ email: email, userId: newUser._id }, "shhhh");
        res.cookie("token", token);
        res.redirect("/profile");
      });
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("post");
  console.log("User data:", user);
  res.render("profile", { user: user });
});

app.post("/posts", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  const { postData } = req.body;

  let post = await postModel.create({
    user: user._id,
    postData: postData,
  });
  user.post.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    res.status(400).send("Entered email doesn't exists!!");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email: email, userId: user._id }, "shhhh");
        res.cookie("token", token);
        res.redirect("/profile");
      } else {
        res.status(400).send("Entered Password is wrong");
      }
    });
  }
});

app.get("/logout", isLoggedIn, (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

//isLoggedIn middleware
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "shhhh");
    req.user = data;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.redirect("/login");
  }
}

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
