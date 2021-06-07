const fs = require('fs');

const log = (req, res, next) => {
    fs.appendFileSync('log.txt', "O usuario entrou na url: " + req.url + "\n");
    next();
}

module.exports =  log;