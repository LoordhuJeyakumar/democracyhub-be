const express = require("express");
const multer = require("multer");
const app = express();
const port = 3333;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.array("photos", 10), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);
  res
    .status(200)
    .json({ message: "Files received", files: req.files, body: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
