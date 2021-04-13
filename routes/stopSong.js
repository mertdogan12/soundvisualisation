const Status = require("./jsons/status.json");
const express = require('express');
const ip = require('./ip.js');
const logLoki = require('./loki.js');
const router = express.Router();

/**
 * sets playing to false
 */
router.get("/", function(req, res) {
	Status.playing = false;

	logLoki(req.ip + "/" + ip() + " - stopSong");
	res.sendStatus(200);
});

module.exports = router;
