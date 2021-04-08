var Status = require("./jsons/status.json");
var express = require('express');
var router = express.Router();

/*
    sets playing to false
*/
router.get("/", function(req, res) {
    Status.playing = false;
    res.sendStatus(200);
});

module.exports = router;