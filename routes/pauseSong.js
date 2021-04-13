const Status = require("./jsons/status.json");
const express = require('express');
const logLoki = require("./loki.js");
const ip = require("./ip");
const router = express.Router();

/**
 * Sets pause to true
 */
router.get("/", function(req, res) {
	Status.pause = true;

	logLoki(req.ip + "/" + ip() + 
		" - pauseSong")
	res.sendStatus(200);
});

module.exports = router;
