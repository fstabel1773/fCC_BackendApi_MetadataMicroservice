var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

/* ***************************
 * project-solution-code *****
 **************************** */

const multer = require("multer");
const upload = multer();

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    const { originalname: name, mimetype: type, size } = req.file;
    return res.status(200).json({ name, type, size });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong. Please try again.", error: error });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
