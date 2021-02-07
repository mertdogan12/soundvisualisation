var Status = require("./status.json");
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.post("/", function(req, res) {
    try {
        r = req.body;
        let file = "../music/" + r.fileName;

        if (!fs.existsSync(file)) {
            res.send("File not exist: " + file)
        };

        Status.currentSong = path.dirname(file) + "/" + path.basename(file);
        Status.playing = true;

        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;