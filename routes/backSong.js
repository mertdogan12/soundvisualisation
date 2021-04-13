const express = require('express');
const changeSong = require('./changeSong');
const logLoki = require('./loki.js');
const ip = require('./ip.js');
const router = express.Router();

/**
 * Goes one song back
 */
router.get("/", function(req, res) {
	let err = changeSong.changeSong("back");
	const ips = req.ip + "/" + ip(); 

	if (typeof err == "string") {
		res.send(err);
		logLoki(ips + " - backSong - Error: " + err);
		return;
	}

	logLoki(ips + " - backSong");
	res.sendStatus(200);
});

module.exports = router;
