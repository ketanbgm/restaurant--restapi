module.exports = function(connection) {

var router = require('express').Router();

router.post('/registar-restaurant', function(req, res){
	var 	restaurant_name  = req.data.restaurant_name;
	if(!restaurant_name){
		res.status(404).send('Invalid name');
	}
	res.send('ok done');
})

// router.post('/login', function(req, res){
// 	var user_name = req.body.username;
// 	var password =  req.body.password;
// 	console.log(password)
// 	   connection.query('SELECT * FROM users where username = ? and password = ?', [user_name, password], function(err, rows) {
// 	   	 if (err) {
//                throw err;
//      		}
//      		else {
//      			res.send(rows)
//      		}
// 	   })
// })
//
// router.post('/login-test', function(req, res){
// 	var user_name = req.body.username;
// 	var password =  req.body.password;
// 	console.log(password)
// 	   connection.query('SELECT * FROM users where username = ? and password = ?', [user_name, password], function(err, rows) {
// 	   	 if (err) {
//                throw err;
//      		}
//      		else {
//      			res.send(rows)
//      		}
// 	   })
// })
	return router;
}
