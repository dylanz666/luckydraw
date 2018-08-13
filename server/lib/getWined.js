const winnerInfo = require("../data/winners.json");

function getWined() {
    let winnersArr = [];
    for (let win in winnerInfo) {
        for (let i = 0; i < winnerInfo[win].length; i++) {
            winnersArr.push(winnerInfo[win][i]);
        }
    }
    return winnersArr;
}

module.exports = getWined;