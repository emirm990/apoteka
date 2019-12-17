const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const destination = path.resolve(__dirname, "../../public/uploads/images");
const upload = multer({ dest: destination });
const connection = require("../../db/connection");
const deleteFiles = require("../../delete");

console.log(destination);
router.post("/", upload.single("photo"), async (req, res) => {
  if (req.file) {
    let extArray = req.file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let filename = path.join(destination, req.file.filename) + "." + extension;

    await connection.query(
      `INSERT INTO images(picture, extension, item_id) VALUES (${JSON.stringify(
        req.file.filename
      )}, ${JSON.stringify(extension)}, ${
        req.query.id
      }) ON DUPLICATE KEY UPDATE picture=${JSON.stringify(
        req.file.filename
      )},extension=${JSON.stringify(extension)}`,
      function(err) {
        if (err) {
          res.status(503).send({ error: err });
        } else {
          deleteFiles.deleteFiles();
          res.status(201).send({ message: "Picture uploaded!" });
        }
      }
    );
    //res.json(req.file);
    //res.json(req.file.mimetype);
  } else {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  await connection.query(
    `SELECT * FROM images WHERE item_id=${req.query.id}`,
    function(err, rows) {
      if (err) {
        res.status(503).send({ error: err });
      } else {
        res.status(200).send({ item: rows });
      }
    }
  );
});
module.exports = router;
