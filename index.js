const moment = require('moment');
const express = require('express');
const Quandl = require("quandl");


let quandl = new Quandl({
    auth_token: "ADD YOUR KEY HERE",
    api_version: 3
});


let app = express();
app.get('/historical/:symbol', function (req, res) {
    quandl.dataset({source: "WIKI", table: req.params.symbol}, {
        start_date: moment().subtract(6, 'months').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD')
    }, function (err, response) {
        if (err)
            throw err;
        res.send(response);
    });
});

app.use('/', express.static('static'));

app.listen(3000, function () {
    console.log('server listening on port 3000')
});
