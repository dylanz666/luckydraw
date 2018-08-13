const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const index = require('./routes/index');
const draw = require("./routes/draw");
const validate = require("./routes/validate");
const getPrizeInfo = require("./routes/getPrizeInfo");
const getWinners = require("./routes/getWinners");

const app = express();

/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
let accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), {flag: 'a'});
app.use(morgan('tiny', {stream: accessLogStream}));

app.use('/', index);
//draw api
app.use('/api/draw', draw);
app.use('/api/validate', validate);
app.use('/api/getPrizeInfo', getPrizeInfo);
app.use('/api/getWinners', getWinners);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../client/dist'));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

let server = app.listen(3000, function () {
    let port = server.address().port;
    console.log("Application is running on http://127.0.0.1:", port);
});

module.exports = app;