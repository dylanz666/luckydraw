const prizeConfiguration = require("../configuration/prizeInfo");
const winnerInfo = require("../data/winners.json");
let left = {};

function getLeftPrize() {
    for (let prize in prizeConfiguration) {
        left[prize] = prizeConfiguration[prize].quantity - winnerInfo[prize].length;
    }
    return left;
}

module.exports = getLeftPrize;