const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bcrypt = require("bcrypt");

app.use(cookieParser());

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const hash = "$2b$10$KIv3qvZ1jAHN9tQtsfLDcuXTgXB8OE.emkMI62n8w5f.xQ7zWiEFW";

app.get("/", (req, res) => {
  //   res.cookie("name", "Aryan");
  res.send("chal raha hai");
  //hashing password using bcrypt (encrypt)
  //   bcrypt.genSalt(saltRounds, function (err, salt) {
  //     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
  //       console.log("hash:", hash);
  //     });
  //   });

  //comparing password using bcrypt (decrypt)
  bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    // result == true
    console.log(result);
  });
});

app.get("/read", (req, res) => {
  const name = req.cookies.name;
  res.send(name);
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});