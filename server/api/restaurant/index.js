module.exports.list_restaurant = function(req, res){
	req.getConnection(function(err,connection){
		connection.query("select * from restaurant", function(err, rows){
	 			if(err){
	 				res.status(404).send({ message: "Database Error" });
	 		} else{
				if(rows.length > 1){
					res.status(200).send(rows);
				} else{
						res.status(200).send({message: "No restaurant Found"});
				}
	 			}
	 	})
 });
};

module.exports.get_restaurant = function(req, res){
	 var id = req.params.id;
	 console.log(id);
	req.getConnection(function(err, connection){
		connection.query("select * from restaurant where id = ?",[id], function(err, rows){
				if(err){
					res.status(404).send({ message: "Database Error" });
			} else{
					if(rows.length > 1){
						res.status(200).send(rows);
					} else{
							res.status(200).send({message: "No Record Found"});
					}
				}
		})
	})
}

module.exports.search_restaurant = function(req, res){
	 var id = req.params.id;
	 console.log(id);
	req.getConnection(function(err, connection){
		connection.query("select * from restaurant where id = ?",[id], function(err, rows){
				if(err){
					res.status(404).send({ message: "Database Error" });
			} else{
					if(rows.length > 1){
						res.status(200).send(rows);
					} else{
							res.status(200).send({message: "No Record Found"});
					}
				}
		})
	})
}


module.exports.delete_restaurant = function(req, res){
	 var id = req.params.id;
	 console.log(id);
	req.getConnection(function(err, connection){
		connection.query("delete from restaurant where id = ?",[id], function(err, rows){
				if(err){
					res.status(400).send({ message: "Database Error" });
			} else{
				if(rows.affectedRows == 0){
					res.status(404).send({ message: "Invalid Restaurant" });
				}else{
					res.status(200).send({ message: "Restaurant details deleted" });
				}
				}
		})
	})
}
module.exports.add_table = function(req, res){
	req.getConnection(function(err,connection){
		var restaurant_id  = req.body.data.restaurant_id;
		var table_no  = req.body.data.table_no;
		var capacity  = req.body.data.capacity;
		req.body.data.last_updated  = new Date();
		if(!restaurant_id){
			res.status(400).send({ message: "Invalid Restaurant" });
		} else if(!table_no) {
				res.status(400).send({ message: "Invalid Table number" });
		} else if(!capacity) {
				res.status(400).send({ message: "Invalid capacity" });
		} else {
			connection.query("INSERT INTO tables set ?", req.body.data, function(err, rows){
				if(err){
					res.status(400).send({ message: "Database Error" });
				}
				else{
					 res.status(200).send({ message: "New table added to restaurant" });
				 }
				  })
}


	 })
 }
 module.exports.delete_table = function(req, res){
 	 var id = req.params.id;
 	 console.log(id);
 	req.getConnection(function(err, connection){
 		connection.query("delete from tables where id = ?",[id], function(err, rows){
 				if(err){
 					res.status(400).send({ message: "Database Error" });
 			} else{
				if(rows.affectedRows == 0){
					res.status(404).send({ message: "Invalid Table" });
				}else{
					res.status(200).send({ message: "Table deleted" });
				}
 				}
 		})
 	})
 }

 module.exports.update_table_capacity = function(req, res){
 	 var id = req.params.id;
	 var capacity = req.body.capacity;

 	req.getConnection(function(err, connection){
		if(!capacity){
 		 res.status(400).send({ message: "Invalid capacity for table" });
 	 }else{
		var data = {
			capacity : capacity
		};
 		connection.query("UPDATE tables set ? WHERE restaurant_id = ? ",[data,id], function(err, rows){
 				if(err){
 					res.status(400).send({ message: "Database Error" });
 			} else{
				if(rows.affectedRows == 0){
					res.status(404).send({ message: "Invalid Restaurant" });
				}else{
 					res.status(200).send({ message: "table capacity updated" });
				}
 				}
 		})
	}
 	})
 }


module.exports.register_restaurant = function(req, res){
	req.getConnection(function(err,connection){
		var restaurant_name  = req.body.data.restaurant_name;
		var email  = req.body.data.email;
		var mobile  = req.body.data.mobile;
		var type  = req.body.data.type;
		var locality  = req.body.data.locality;
		var address  = req.body.data.address;
		var city  = req.body.data.city;
		var state  = req.body.data.state;
		req.body.data.last_update  = new Date();
		if(!restaurant_name){
			res.status(404).send({ message: "Invalid name" });
		} else if(!email) {
				res.status(404).send({ message: "Invalid Email" });
		} else if(!mobile) {
				res.status(404).send({ message: "Invalid mobile" });
		} else if(!type) {
				res.status(404).send({ message: "Invalid type" });
		} else if(!locality) {
				res.status(404).send({ message: "Invalid locality" });
		} else if(!address) {
				res.status(404).send({ message: "Invalid address" });
		} else if(!city) {
				res.status(404).send({ message: "Invalid city" });
		} else if(!state) {
				res.status(404).send({ message: "Invalid state" });
		}  else{
			connection.query("INSERT INTO restaurant set ?", req.body.data, function(err, rows){

					 if(err){
						 console.log(err);
						 	console.log(err.toString());
							 res.status(404).send({ message: err });
					 } else{
							 res.status(200).send({ message: "New Restaurant Onboarded" });
					 }

				 })
		}
 });
};