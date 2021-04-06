var Status = require("./status.json");
var express = require('express');
var router = express.Router();

/*
    sets pause to true
*/
router.get("/", function(req, res) {
    Status.pause = false;
    res.sendStatus(200);
});

module.exports = router;