/**Created by Dylan*/
const express = require('express');
const router = express.Router();
const getNewWinners = require("../lib/getNewWinners");
const saveNewWinners = require("../lib/saveNewWinners");
const getLeftPrize = require("../lib/getLeftPrize");
/**Consume:
 * employeeNum:required
 * drawQuantity:required
 * prizeLevel:required
 * reDraw:optional(default to false)
 * */
router.get('/', function (req, res) {
    let employees = req.query.employees;
    let drawQuantity = req.query.drawQuantity;
    let prizeLevel = req.query.prizeLevel;
    let reDraw = req.query.reDraw === "true";
    let drawResult = getNewWinners(employees, drawQuantity, prizeLevel, reDraw);
    drawResult.allWinners = saveNewWinners(drawResult.newWinners, prizeLevel);
    drawResult.leftPrize = getLeftPrize();
    res.send(drawResult);
});

module.exports = router;







