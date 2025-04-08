const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userAuth");

const userSchema = mongoose.Schema({
    username: String,
    email:String,
    password: String,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
})

module.exports = mongoose.model("User", userSchema);