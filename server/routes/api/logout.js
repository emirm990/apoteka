const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return err;
        }
        res.clearCookie('sid');
        console.log(req.session);
        res.status(200).send("Logout succesful");
    })
})

module.exports = router;