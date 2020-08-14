var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.json({userName:"陳大文",emailAddress:"dmChan@gmail.com"})
});

module.exports = router;