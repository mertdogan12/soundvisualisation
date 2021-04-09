var Status = require("./jsons/status.json");
var express = require('express');
var router = express.Router();

/**
 * Sends:
 * 	The current playing song
 * 	The current picture
 * 	The Status of the Song (playing, pause)
 */
router.get("/", function(req, res) {
    res.json(Status);
});

module.exports = router;
