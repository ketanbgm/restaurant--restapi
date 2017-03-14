module.exports = function(connection) {

var router = require('express').Router();

	router.post('/registartion', function(req,res){
		res.send("without middleware");
	})

	return router;
}
