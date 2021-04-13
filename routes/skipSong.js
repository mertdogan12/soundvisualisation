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
	const ips = req.ip + "/" + ip();

	if (typeof err == "string") {
		res.send(err);
		logLoki(ips + " - skipSong - Error: " + err);
		return;
	}

	logLoki(ips + " - skipSong");
	res.sendStatus(200);
});

module.exports = router;
