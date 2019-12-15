const express = require("express");
const router = express.Router();
const connection = require("../../db/connection");

router.get("/", async (req, res) => {
  await connection.query("SELECT * FROM items", function(err, rows) {
    if (err) {
      res.status(503).send({ error: err });
    } else {
      res.status(200).send({ items: rows });
    }
  });
});

module.exports = router;
