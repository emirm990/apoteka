const express = require("express");
const router = express.Router();
const connection = require("../../db/connection");

router.get("/", async (req, res) => {
  await connection.query(
    `SELECT * FROM items WHERE id = ${req.query.id}`,
    function (err, rows) {
      if (err) {
        res.status(503).send({ error: err });
      } else {
        res.status(200).send({ item: rows });
      }
    }
  );
});
router.post("/", async (req, res) => {
  await connection.query(
    `UPDATE items SET name=${JSON.stringify(
      req.body.name
    )},description=${JSON.stringify(req.body.description)},price=${
    req.body.price
    },stock=${req.body.stock} WHERE id=${req.query.id}`,
    function (err, row) {
      if (err) {
        res.status(503).send({ error: err.affectedRows });
      } else {
        res.status(201).send({ message: row });
      }
    }
  );
});

router.delete("/", async (req, res) => {
  await connection.query(`DELETE FROM items WHERE id=${req.query.id}`, function (
    err,
    results,
    fields
  ) {
    if (err) {
      res.status(503).send({ error: err });
    } else {
      res.status(201).send({ message: results.affectedRows });
    }
  });
});
module.exports = router;
