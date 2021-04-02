var conf = require("./conf.json");
var express = require('express');
var router = express.Router();
const fs = require('fs');

/*
    Sends all Songs awailele
*/
router.get("/", function (req, res) {
    let soundPath = conf.soundPath;

    if (req.query.path != null) soundPath += req.query.path;

    if (!fs.existsSync(soundPath)) {
        res.sendStatus(500);
        return;
    }

    if (soundPath[soundPath.length - 1] != '/') soundPath += '/';

    fs.readdir(soundPath, (err, files) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        let out = [];

        for (let i = 0; i < files.length; i++) {
            let type = "file"
            if (fs.lstatSync(soundPath + files[i]).isDirectory()) type = "dir";

            out[i] = {
                "type": type,
                "name": files[i]
            }
        }

        res.json(out);
    });
});

module.exports = router;