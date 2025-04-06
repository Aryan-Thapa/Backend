const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  const { username, email, image } = req.body;
  let createdUser = await userModel.create({
    username: username,
    email: email,
    image: image,
  });
  res.redirect("/users");
});

app.get("/users", async (req, res) => {
  let users = await userModel.find();
  res.render("users", { users: users });
});

app.get("/delete/:userid", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({
    _id: req.params.userid,
  });
  res.redirect("/users");
});

app.get("/edit/:userid", async (req, res) => {
  let editUser = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user: editUser });
});

app.post("/update/:userid", async (req, res) => {
  const { username, email, image } = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: req.params.userid }, { username: username, email: email, image: image }, { new: true });
  res.redirect("/users");
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
