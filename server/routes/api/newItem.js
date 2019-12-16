const express = require("express");
const router = express.Router();
const connection = require("../../db/connection");

router.post("/", async (req, res) => {
  await connection.query(
    `INSERT INTO items (name,description,price,stock) VALUES (${JSON.stringify(
      req.body.name
    )}, ${JSON.stringify(req.body.description)},${req.body.price},${
    req.body.stock
    })`,
    function (err) {
      if (err) {
        res.status(503).send({ error: err });
      } else {
        res.status(201).send({ Message: "New item added!" });
      }
    }
  );
});

module.exports = router;
