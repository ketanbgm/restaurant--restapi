module.exports.search_table_capacity = function(req, res){
	var id = req.params.id;
	var capacity = req.params.capacity;
	console.log(id);
	console.log(capacity);
	req.getConnection(function(err,connection){
		connection.query("select restaurant_name from restaurant where id = ?", [id], function(err, rows){
			if(err){
				res.status(404).send({ message: "Database Error" });
			}
			else{
				console.log(rows)
				if(rows.length < 1){
					res.status(400).send({message : "Restaurant Not found"})
				}
				else{
						connection.query("select r.restaurant_name, t.table_no, t.capacity, r.email, r.mobile,r.type, r.locality, r.address from tables t,restaurant r where t.restaurant_id = ? and r.id and t.capacity = ?",[id,capacity], function(err, rows){
	 			if(err){
	 				console.log(err);
	 				res.status(404).send({ message: "Database Error" });
	 		} else{
	 			console.log(rows)
					console.log(rows.length);
					if(rows.length < 1){
						res.status(400).send({ message : "No tables found"});
					} else{
						res.status(200).send(rows);
					}
					
			
	 			}
	 	})
				}
			}
		})


	
 });
};

module.exports.review = function(req, res){
	req.getConnection(function(err,connection){
		var customer_name  = req.body.data.customer_name;
		var email  = req.body.data.email;
		var review  = req.body.data.review;
		var review_description = req.body.data.review_description;
		var restaurant_id = req.body.data.restaurant_id;
		req.body.data.last_update  = new Date();
		if(!restaurant_id){
			res.status(400).send({ message: "Invalid Restaurant" });
		} else if(!customer_name) {
				res.status(400).send({ message: "Name cannot be empty" });
		} else if(!email) {
				res.status(400).send({ message: "Email cannot be empty" });
		} else if(!review) {
				res.status(400).send({ message: "select atleat one type" });
		} else {

			connection.query("select restaurant_name from restaurant where id = ?", [restaurant_id], function(err, rows){
			if(err){
				res.status(404).send({ message: "Database Error" });
			}
			else{
				console.log(rows)
				if(rows.length < 1){
					res.status(400).send({message : "Restaurant Not found"})
				}
				else{
					connection.query("INSERT INTO reviews set ?", req.body.data, function(err, rows){
					if(err){
						res.status(400).send({ message: "Database Error" });
					}
					else{
						 res.status(200).send({ message: "New table added to restaurant" });
					 }
				  })
				}
			}
		});
	}
			
});


	 };

module.exports.book_table= function(req, res) {
	// body...
	var customer_name  = req.body.data.customer_name;
	var email  = req.body.data.email;
	var booking_date  = req.body.data.booking_date;
	var booking_from = req.body.data.booking_from;
	var booking_to = req.body.data.booking_to;
	var table_id  = req.body.data.table_id;
	var mobile  = req.body.data.mobile;
	var restaurant_id = req.body.data.restaurant_id;
	req.getConnection(function(err,connection){
		connection.query("SELECT id FROM restaurant WHERE id = ?",[restaurant_id], function(err,rows){
			if(err){
				console.log(err);
				res.status(404).send({ message: "Database Error" });
			}else {
				console.log(rows);
				if(rows.length < 1){
					res.status(400).send({ message: "Restaurant not found"});
				}
				else{
						connection.query("SELECT id FROM tables WHERE id = ?",[table_id], function(err,rows){
							if(err){
								console.log(err);
								res.status(404).send({ message: "Database Error" });
								}else {
									if(rows.length < 1){
										res.status(400).send({ message: "Table not found"});
									}
									else{
										connection.query("select open_time, close_time from restaurant where id = ?",[restaurant_id],function(err, rows){
											if(err){
												res.status(404).send({ message: "Database Error" });
											}else{
												if(rows[0].open_time > booking_from || rows[0].close_time < booking_to){
													res.status(400).send({message: "restaurant is closed at the moment"})
												}
												else{
													connection.query("",[], function(err,res){
														
													})
													/*res.send("restaurant is open");*/
												}
											}
		
										})
									}
								}
						});
				}
				
			}
		})
	/*	connection.query("select open_time, close_time from restaurant where id = ?",[restaurant_id],function(err, rows){
			if(err){
				res.status(404).send({ message: "Database Error" });
			}else{
			if(rows[0].open_time > booking_from || rows[0].close_time < booking_to){
				res.status(400).send({message: "restaurant is closed at the moment"})
			}
		}
		
		})*/
	});
}
