var Status = require("./status.json");
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const conf = require('./conf.json');

/*
    Updates the song 
    Set playing --> true
*/
router.post("/", function(req, res) {
    try {
        r = req.body;
        if (r.fileName == undefined) {
            res.send("fileName is missing")
            return;
        }
        
        let file = conf.soundPath + r.fileName;

        if (!fs.existsSync(file)) {
            res.send("File not exist: " + file);
            return;
        };

        Status.currentSong = r.fileName;
        Status.playing = true;

        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;