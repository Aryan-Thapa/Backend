const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hii");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Aryan Thapa",
    age: 22,
    email: "aryanthapa@gmail.com",
  });
  res.send(createdUser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find({});
  res.send(users);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { name: "Aryan Thapa" },
    { age: 23 },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ name: "Aryan Thapa" });
  res.send(deletedUser);
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000!!!");
});
