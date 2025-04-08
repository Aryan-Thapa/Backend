const express = require("express");
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "Aryan Thapa",
    email: "aryan@gmail.com",
    password: "123456",
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postData: "This is my first post",
    user: "67f5715249e37520d7db15d7",
  });
  let user = await userModel.findOne({ _id: "67f5715249e37520d7db15d7" });
  user.post.push(post._id);
  await user.save();
  res.send(post);
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
