const prizeConfiguration = require("../configuration/prizeInfo");

function getPrizeTotalQuantity() {
    let quantity = 0;
    for (let prize in prizeConfiguration) {
        quantity += prizeConfiguration[prize].quantity;
    }
    return quantity;
}

module.exports = getPrizeTotalQuantity;