const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  const fileName = req.body.title.split(" ").join("") + ".txt";
  const filePath = path.join(__dirname, "files", fileName);
  const fileContent = req.body.task;

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error saving the task.");
    }
    res.redirect("/");
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("file", { filename: req.params.filename, filedata: data });
  });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT 3000");
});
