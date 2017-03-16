var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mysql = require('mysql');
var restaurant = require('./api/restaurant/index');
var customer = require('./api/customer/index');
var connection = require('express-myconnection');
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
var server = app.listen(7000, function() {
    console.log('Server listening on port ' + server.address().port);
    app.get('/list_restaurant', restaurant.list_restaurant);
    app.post('/register_restaurant', restaurant.register_restaurant);
    app.get('/get_restaurant/edit/:id', restaurant.get_restaurant);
    app.delete('/delete_restaurant/delete/:id', restaurant.delete_restaurant);
    app.post('/add_table', restaurant.add_table);
    app.put('/update_table_capacity/update/:id', restaurant.update_table_capacity);
    app.delete('/delete_table/delete/:id', restaurant.delete_table);
    app.get('/search/table/:id/:capacity', customer.search_table_capacity);
    app.post('/review', customer.review);
    app.post('/book_table', customer.book_table);
    app.post('/cancle_table', customer.cancle_table);
    app.get('/bookings_by_time/:table_id/:start_date/:end_date', customer.bookings_by_time);
    app.post('/search_restaurant', customer.search_restaurant);

});
