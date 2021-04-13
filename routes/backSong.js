var express = require('express');
var changeSong = require('./changeSong');
var router = express.Router();

/**
 * Goes one song back
 */
router.get("/", function(req, res) {
	let err = changeSong.changeSong("back");

	if (typeof err == "string") {
		res.send(err);
		logLoki(ip() + " - backSong - Error: " + err);
		return;
	}

	logLoki(ip() + " - backSong");
	res.sendStatus(200);
});

module.exports = router;
