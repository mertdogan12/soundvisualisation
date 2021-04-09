var conf = require("./jsons/conf.json");
var express = require('express');
var router = express.Router();
const fs = require('fs');

/*
    Sends all Songs awaileble
*/
router.get("/", function (req, res) {
    const songs = getSongs(req.query.path);

    if (typeof songs == "string") {
        res.send(songs);
        return;
    }

    res.json(songs);
});

function getSongs(path) {
    let soundPath = conf.soundPath;
    if (path != null) soundPath += path;

    if (!fs.existsSync(soundPath)) { return "File not exist"; }

    if (soundPath[soundPath.length - 1] != '/') soundPath += '/';

    let files = fs.readdirSync(soundPath)

    let out = [];

    out[0] = {
        "type": "dir",
	"name": "..",
	"path": path.split("/").splice(0, -1).join("/")
    }

    for (let i = 1; i <= files.length; i++) {
        let type = "file"
        if (fs.lstatSync(soundPath + files[i - 1]).isDirectory()) type = "dir";

        out[i] = {
            "type": type,
            "name": files[i - 1],
            "path": soundPath.replace(conf.soundPath, "") + files[i - 1]
        }
    }

    return out;
}

module.exports = router;
module.exports.getSongs = getSongs;
