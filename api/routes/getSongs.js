var conf = require("./conf.json");
var express = require('express');
var router = express.Router();
const fs = require('fs');

/*
    Sends all Songs awailele
*/
router.get("/", function(req, res) {
    fs.readdir(conf.soundPath, (err, files) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        out = {
            "songs": files
        }
        
        res.json(files);
    });
});

module.exports = router;