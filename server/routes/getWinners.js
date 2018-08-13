/**Created by Dylan*/
const express = require('express');
const router = express.Router();
const prizeInfo = require("../configuration/prizeInfo");
const winners = require("../data/winners.json");

router.get('/', function (req, res) {
    let winnerArr = [];
    for (let w in winners) {
        winnerArr.push(prizeInfo[w].label + ":" + winners[w])
    }
    res.send(winnerArr);
});

module.exports = router;