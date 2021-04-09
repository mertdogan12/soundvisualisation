var Status = require("./jsons/status.json");
var express = require('express');
var router = express.Router();

/**
 * Sets pause to true
 */
router.get("/", function(req, res) {
    Status.pause = true;
    res.sendStatus(200);
});

module.exports = router;
