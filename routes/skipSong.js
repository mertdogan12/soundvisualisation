const express = require('express');
const changeSong = require('./changeSong')
const logLoki = require('./loki.js');
const ip = require('./ip.js');
const router = express.Router();

/**
 * Skips to the next Song
 */
router.get("/", function(req, res) {
	let err = changeSong.changeSong("next");

	if (typeof err == "string") {
		res.send(err);
		logLoki(ip() + " - skipSong - Error: " + err);
		return;
	}

	logLoki(ip() + " - skipSong");
	res.sendStatus(200);
});

module.exports = router;
