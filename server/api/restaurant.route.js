const express = require('express');
const router = express.Router();

const restaurant =  require('./restaurant');

router.get('/list_restaurant', restaurant.list_restaurant);
router.post('/register_restaurant', restaurant.register_restaurant);
router.get('/get_restaurant/edit/:id', restaurant.get_restaurant);
router.delete('/delete_restaurant/delete/:id', restaurant.delete_restaurant);
router.post('/add_table', restaurant.add_table);
router.put('/update_table_capacity/update/:id', restaurant.update_table_capacity);
router.delete('/delete_table/delete/:id', restaurant.delete_table);

module.exports = router;