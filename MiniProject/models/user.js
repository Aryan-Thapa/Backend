const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/miniProject");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
