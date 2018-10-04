var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
const restaurant = require('./api/restaurant.route');
const customer = require('./api/customer.route');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(

    connection(mysql, {

        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'restaurant'

    }, 'pool')

);
app.use('/restaurant', restaurant);
app.use('/customer', customer);


var server = app.listen(7000, function() {
    console.log('Server listening on port ' + server.address().port);
});
