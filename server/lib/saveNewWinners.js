let fs = require("fs");
let winnerInfo = require("../data/winners.json");

function saveNewWinners(newWinnerArr, prizeLevel) {
    if (newWinnerArr.length < 1 || !prizeLevel) {
        return winnerInfo;
    }
    console.log("Saving new winners...");
    winnerInfo[prizeLevel] = winnerInfo[prizeLevel] ? winnerInfo[prizeLevel] : [];
    winnerInfo[prizeLevel] = winnerInfo[prizeLevel].concat(newWinnerArr);
    console.log("What to save:", winnerInfo);
    fs.writeFileSync("./data/winners.json", JSON.stringify(winnerInfo));
    console.log("Complete saved!");
    console.log(`Congratulations! ${newWinnerArr} got the prize ${prizeLevel}!`);//Can change to save to DB
    return winnerInfo;
}

module.exports = saveNewWinners;