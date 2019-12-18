module.exports.isAuthorized = function (req, res, next) {
    console.log(req.session);
    if (req.session.userId) {
        return next();
    } else {
        return res.redirect("/api/unauthorized");
    }
}