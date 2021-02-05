var Status = require("./status.json");
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.post("/", function(req, res) {
    try {
        r = req.body;
        let file = "../music/" + r.fileName;

        if (!fs.existsSync(file)) res.sendStatus(500);

        Status.currentSong = path.dirname(file) + "/" + path.basename(file);
        Status.playing = true;
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;