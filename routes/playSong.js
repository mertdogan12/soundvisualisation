var Status = require("./jsons/status.json");
const conf = require('./jsons/conf.json');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * Updates the song if the song is not blank
 * Updates the picture if the pic is not blank
 * Sets playing to true
 * Sets pause to false
 */
router.post("/", function (req, res) {
    try {
        let r = req.body;
        if (r.fileName == undefined) {
            res.send("fileName is missing")
            return;
        }

        if (r.picName == undefined) {
            res.send("picName is missing")
            return;
        }

        let file = r.fileName;
        let pic = r.picName;

        if (!r.fileName.includes("http://") && !r.fileName.includes("https://")
            && r.fileName.replace(" ", "") != "") {
            file = conf.soundPath + r.fileName;

            if (fs.lstatSync(file).isDirectory()) {
                res.send("File is an directory: " + file);
                return;
            }

            if (!fs.existsSync(file) || file == conf.soundPath) {
                res.send("File not exist: " + file);
                return;
            }
        }

        if (!r.picName.includes("http://") && !r.picName.includes("https://")
            && r.picName.replace(" ", "") != "") {
            pic = conf.picPath + r.picName;

            if (!fs.existsSync(pic) || pic == conf.picPath) {
                res.send("File not exist: " + pic);
                return;
            }
        }

        if (r.fileName.replace(" ", "") != "") Status.currentSong = r.fileName;
        if (r.picName.replace(" ", "") != "") Status.pic = r.picName;
        Status.playing = true;
        Status.pause = false

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
