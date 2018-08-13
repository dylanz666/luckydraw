const prizeConfiguration = require("../configuration/prizeInfo");
const getPrizeTotalQuantity = require("./getPrizeTotalQuantity");

function validateRequestParameters(winnerInfo, employeeQuantity, drawQuantity, prizeLevel, reDraw) {
    let pattern = /^[0-9]+.?[0-9]*/;
    //validate type of parameters
    if (!pattern.test(employeeQuantity) || !pattern.test(drawQuantity) || !pattern.test(prizeLevel)) {
        return {
            status: "fail",
            message: "Invalid parameter"
        }
    }
    employeeQuantity = parseInt(employeeQuantity);
    drawQuantity = parseInt(drawQuantity);
    prizeLevel = parseInt(prizeLevel);
    console.log(employeeQuantity, drawQuantity, prizeLevel);
    //validate for prizeLevel
    if (!prizeConfiguration[prizeLevel]) {
        return {
            status: "fail",
            message: "Invalid prize level!"
        }
    }
    let configuredPrizeQuantity = prizeConfiguration[prizeLevel].quantity;
    let winedQuantity = winnerInfo[prizeLevel] ? winnerInfo[prizeLevel].length : 0;
    let prizeTotalQuantity = getPrizeTotalQuantity();
    //validate for employeeQuantity
    if (employeeQuantity < prizeTotalQuantity) {
        return {
            status: "fail",
            message: "Employees quantity is not enough!"
        }
    }
    //validate for drawQuantity
    if (typeof(drawQuantity) !== "number" || drawQuantity <= 0) {
        return {
            status: "fail",
            message: "Invalid draw quantity!"
        }
    }
    //validate if the prize level is completed or not.
    if (winedQuantity === configuredPrizeQuantity && !reDraw) {
        return {
            status: "fail",
            message: "The prize level is drawn!"
        }
    }
    //validate if this is for re-draw
    if (winedQuantity === configuredPrizeQuantity && reDraw && drawQuantity <= configuredPrizeQuantity) {
        winnerInfo[prizeLevel] = [];
        return {
            status: "pass",
            message: "Re-Draw"
        }
    }
    //validate if draw quantity is to large or not
    if ((winedQuantity + drawQuantity) > configuredPrizeQuantity) {
        return {
            status: "fail",
            message: "The draw quantity is too large!"
        }
    }
    //validate if this is a normal draw
    if ((winedQuantity + drawQuantity) <= configuredPrizeQuantity) {
        return {
            status: "pass",
            message: "success"
        }
    }
    //default return
    return {
        status: "fail",
        message: "Unknown error"
    }
}

module.exports = validateRequestParameters;