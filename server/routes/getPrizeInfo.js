/**Created by Dylan*/
const express = require('express');
const router = express.Router();
const prizeInfo = require("../configuration/prizeInfo");

router.get('/', function (req, res) {
    let prizeArr = [];
    for (let p in prizeInfo) {
        prizeArr.push(prizeInfo[p]);
    }
    res.send(prizeArr);
});
module.exports = router;