const express = require("express");
const router = express.Router();
const connection = require("../../db/connection");
const deleteFiles = require("../../delete");

router.get("/", async (req, res) => {
  await connection.query(
    `SELECT i.id,name,description,stock,price,picture,extension,item_id
     FROM items i 
     LEFT JOIN images p 
     ON i.id=p.item_id 
     WHERE i.id=${req.query.id}
    `,
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
    function (err) {
      if (err) {
        res.status(503).send({ error: err });
      } else {
        res.status(201).send({ message: "Item updated!" });
      }
    }
  );
});

router.delete("/", async (req, res) => {
  await connection.query(`DELETE items, images FROM items JOIN images ON items.id = images.item_id WHERE items.id = ${req.query.id}`, function (
    err,
    results,
    fields
  ) {
    if (err) {
      res.status(503).send({ error: err });
    } else {
      deleteFiles.deleteFiles();
      res.status(201).send({ message: results });
    }
  });
});
module.exports = router;
