function getRandomNumber(employeeNum, oldWinners) {
    if (!employeeNum || !oldWinners) {
        return null;
    }
    return getRandom(employeeNum, oldWinners);
}

//use recursion to get not non-repetitive random number
function getRandom(employeeNum, oldWinners) {
    let randomNumber = Math.floor(Math.random() * employeeNum);
    for (let i = 0; i < oldWinners.length; i++) {
        if (randomNumber === oldWinners[i]) {
            randomNumber = getRandom(employeeNum, oldWinners);
        }
    }
    return randomNumber;
}

module.exports = getRandomNumber;