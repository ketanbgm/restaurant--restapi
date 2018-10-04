const express = require('express');
const router = express.Router();

const customer =  require('./customer');


router.get('/search/table/:id/:capacity', customer.search_table_capacity);
router.post('/review', customer.review);
router.post('/book_table', customer.book_table);
router.post('/cancle_table', customer.cancle_table);
router.get('/bookings_by_time/:table_id/:start_date/:end_date', customer.bookings_by_time);
router.post('/search_restaurant', customer.search_restaurant);

module.exports = router;