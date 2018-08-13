let winnerInfo = require("../data/winners.json");
let getWined = require("./getWined");
let getRandomNumber = require("./getRandomNumber");
const validateRequestParameters = require("./validateRequestParameters");

function getNewWinners(employeeQuantity, drawQuantity, prizeLevel, reDraw = false) {
    //validation
    let validatedInfo = validateRequestParameters(winnerInfo, employeeQuantity, drawQuantity, prizeLevel, reDraw);
    if (validatedInfo.status === "fail") {
        validatedInfo.newWinners = [];
        return validatedInfo
    }
    //start to draw
    let newWinnerArr = [];
    for (let i = 0; i < drawQuantity; i++) {
        let newWinner = getRandomNumber(employeeQuantity, getWined);
        newWinner ? newWinnerArr.push(newWinner) : null;
    }
    console.log("Got new winners:", newWinnerArr);
    validatedInfo.newWinners = newWinnerArr;
    return validatedInfo;
}

module.exports = getNewWinners;