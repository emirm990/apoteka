module.exports.sessionActive = function (req, res, next) {
    if (req.session.userId) {
        res.redirect("/api/session");
        return next();
    } else {
        return next();
    }
}