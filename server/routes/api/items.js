const express = require("express");
const router = express.Router();
const connection = require("../../db/connection");

router.get("/", async (req, res) => {
  await connection.query("SELECT i.id,name,description,stock,price,picture,extension,item_id FROM items i LEFT JOIN images p ON i.id=p.item_id", function (err, rows) {
    if (err) {
      res.status(503).send({ error: err });
    } else {
      res.status(200).send({ items: rows });
    }
  });
});

module.exports = router;
