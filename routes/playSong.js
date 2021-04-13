const Status = require("./jsons/status.json");
const conf = require('./jsons/conf.json');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ip = require('./ip.js');
const logLoki = require('./loki.js')

/**
 * Updates the song if the song is not blank
 * Updates the picture if the pic is not blank
 * Sets playing to true
 * Sets pause to false
 */
router.post("/", function (req, res) {
	try {
		const ips = req.ip + "/" + ip()
		let r = req.body;

		if (r.fileName == undefined) {
			res.send("fileName is missing")
			logLoki(ips + " - playSong - Error: fileName is missing");
			return;
		}

		if (r.picName == undefined) {
			res.send("picName is missing")
			logLoki(ips + " - playSong - Error: picName is missing");
			return;
		}

		let file = r.fileName;
		let pic = r.picName;

		if (!r.fileName.includes("http://") && !r.fileName.includes("https://")
			&& r.fileName.replace(" ", "") != "") {
			file = conf.soundPath + r.fileName;

			if (fs.lstatSync(file).isDirectory()) {
				res.send("File is an directory: " + file);
				logLoki(ips + " - playSong - " + 
					"Error: File is an directory: " + file);
				return;
			}

			if (!fs.existsSync(file) || file == conf.soundPath) {
				res.send("File not exist: " + file);
				logLoki(ips + " - playSong - " + 
					"Error: File not exist: " + file);
				return;
			}
		}

		if (!r.picName.includes("http://") && !r.picName.includes("https://")
			&& r.picName.replace(" ", "") != "") {
			pic = conf.picPath + r.picName;

			if (!fs.existsSync(pic) || pic == conf.picPath) {
				res.send("File not exist: " + pic);
				logLoki(ips + " - playSong - " + 
					"Error: File not exist: " + pic);
				return;
			}
		}

		if (r.fileName.replace(" ", "") != "") Status.currentSong = r.fileName;
		if (r.picName.replace(" ", "") != "") Status.pic = r.picName;
		Status.playing = true;
		Status.pause = false

		logLoki(ips + " - playSong - " + r.fileName);
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

module.exports = router;
