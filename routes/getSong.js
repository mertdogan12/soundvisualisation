var Status = require("./status.json");
var express = require('express');
var router = express.Router();

/*
    Sends
        - the current Song
        - the playing status
*/
router.get("/", function(req, res) {
    res.json(Status);
});

module.exports = router;