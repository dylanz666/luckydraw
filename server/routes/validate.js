/**Created by Dylan*/
const express = require('express');
const router = express.Router();
let winnerInfo = require("../data/winners.json");
const validateRequestParameters = require("../lib/validateRequestParameters");
/**Consume:
 * employeeNum:required
 * drawQuantity:required
 * prizeLevel:required
 * */
router.get('/', function (req, res) {
    let employeeQuantity = req.query.employees;
    let drawQuantity = req.query.drawQuantity;
    let prizeLevel = req.query.prizeLevel;
    let reDraw = false;
    let drawResult = validateRequestParameters(winnerInfo, employeeQuantity, drawQuantity, prizeLevel, reDraw);
    res.send(drawResult);
});

module.exports = router;







