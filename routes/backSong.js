var express = require('express');
var changeSong = require('./changeSong');
var router = express.Router();

router.get("/", function(req, res) {
    let err = changeSong.changeSong("back");

    if (typeof err == "string") {
        res.send(err);
        return;
    }
    
    res.sendStatus(200);
});

module.exports = router;