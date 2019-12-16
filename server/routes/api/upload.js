const express = require("express");
const router = express.Router();
const fs = require('fs');
const fsextra = require('fs-extra');
const path = require('path');
const multer = require('multer');
const destination = path.resolve(__dirname, '../../public/uploads/images');
const upload = multer({ dest: destination });
const connection = require("../../db/connection");

console.log(destination);
router.post("/", upload.single('photo'), async (req, res) => {
    if (req.file) {
        let extArray = req.file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        let filename = path.join(destination, req.file.filename) + "." + extension;
        await connection.query(`INSERT INTO images (picture,extension,item_id) VALUES (${JSON.stringify(
            req.file.filename
        )}, ${JSON.stringify(extension)}, ${req.query.id})`, function (err) {
            if (err) {
                res.status(503).send({ error: err })
            } else {
                res.status(201).send({ Message: "Image uploaded!" })
            }
        })
        //res.json(req.file);
        //res.json(req.file.mimetype);
    } else {
        console.log(error);
    }
});

module.exports = router;