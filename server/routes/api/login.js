const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require("../../db/connection");
const isAuth = require("../../auth");
router.post("/", async (req, res) => {
    if (req.session.userId) {
        res.status(200).send("Authenticated");
    } else {
        await connection.query(
            `SELECT name, password FROM users WHERE name=${JSON.stringify(req.body.name)}`,
            async function (err, rows) {
                if (err) {
                    res.status(500).send("Internal server error!");
                } else if (rows.length > 0) {
                    let name = req.body.name;
                    let password = req.body.password;
                    if (name != rows[0].name) {
                        res.status(200).send("Wrong email or password!");
                    } else {
                        await bcrypt.compare(password, rows[0].password, function (err, response) {
                            if (err) {
                                res.send(500).send("Wrong email or password!");
                            } else {
                                if (response) {
                                    req.session.userId = name;
                                    res.status(200).send("Authenticated");
                                } else {
                                    res.status(200).send("Wrong email or password!");
                                }
                            }
                        });
                    }
                } else {
                    res.status(404).send("User not found!");
                }
            }
        );
    }

});

module.exports = router;