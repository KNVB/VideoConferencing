var express = require('express');
const { request } = require('express');
var router = express.Router();

router.post("/",function(req, res, next){
    console.log(req.body);
});
module.exports = router;