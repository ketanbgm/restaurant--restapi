module.exports.search_table_capacity = function(req, res) {
    var id = req.params.id;
    var capacity = req.params.capacity;
    if (!id || isNaN(id)) {
        res.status(404).send({
            message: "Invalid Restaurant"
        });
    } else if (!capacity || isNaN(capacity)) {
        res.status(404).send({
            message: "Invalid capacity"
        });
    } else {
        req.getConnection(function(err, connection) {
            connection.query("select restaurant_name from restaurant where id = ?", [id], function(err, rows) {
                if (err) {
                    res.status(404).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length < 1) {
                        res.status(400).send({
                            message: "Restaurant Not found"
                        })
                    } else {
                        connection.query("select r.restaurant_name, t.table_no, t.capacity, r.email, r.mobile,r.type, r.locality, r.address from tables t,restaurant r where t.restaurant_id = ? and t.restaurant_id = r.id and t.capacity >= ?", [id, capacity], function(err, rows) {
                            if (err) {
                                res.status(404).send({
                                    message: "Database Error"
                                });
                            } else {
                                if (rows.length < 1) {
                                    res.status(400).send({
                                        message: "No tables found"
                                    });
                                } else {
                                    res.status(200).send(rows);
                                }


                            }
                        })
                    }
                }
            })
        });
    }
};

module.exports.review = function(req, res) {
    req.getConnection(function(err, connection) {
        var customer_name = req.body.customer_name;
        var email = req.body.email;
        var review = req.body.review;
        var review_description = req.body.review_description;
        var restaurant_id = req.body.restaurant_id;
        var regex = /^[A-Za-z ]+$/;
        var Email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        req.body.last_update = new Date();
        if (!restaurant_id || isNaN(restaurant_id)) {
            res.status(400).send({
                message: "Invalid Restaurant"
            });
        } else if (!customer_name || regex.test(customer_name) == false) {
            res.status(400).send({
                message: "Invalid Name"
            });
        } else if (!email || Email_regex.test(email) == false) {
            res.status(400).send({
                message: "Invalid Email"
            });
        } else if (!review) {
            res.status(400).send({
                message: "select atleat one type"
            });
        } else {

            connection.query("select restaurant_name from restaurant where id = ?", [restaurant_id], function(err, rows) {
                if (err) {
                    res.status(404).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length < 1) {
                        res.status(400).send({
                            message: "Restaurant Not found"
                        })
                    } else {
                        connection.query("INSERT INTO reviews set ?", req.body, function(err, rows) {
                            if (err) {
                                res.status(400).send({
                                    message: "Database Error"
                                });
                            } else {
                                res.status(200).send({
                                    message: "Thank you for your review"
                                });
                            }
                        })
                    }
                }
            });
        }

    });


};

module.exports.book_table = function(req, res) {
    var moment = require('moment');
    var restaurant_id = req.body.restaurant_id;
    var customer_name = req.body.customer_name;
    var email = req.body.email;
    var booking_date = req.body.booking_date;
    var booking_from = req.body.booking_from;
    var booking_to = req.body.booking_to;
    var book_from = moment(booking_from, 'HH:mm').add(1, 'minutes').format('HH:mm');
    var table_id = req.body.table_id;
    var mobile = req.body.mobile;
    var regex = /^[A-Za-z ]+$/;
    var Email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var mobile_regex = /^[789]\d{9}$/;
    var date_regex = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    var time_reg = new RegExp('^[0-9][0-9][:][0-9][0-9]$');
    req.body.status = 1;
    var current_date = moment().format('YYYY-MM-DD');
    var booking_prior = moment(current_date, "YYYY-MM-DD").add(7, 'days').format('YYYY-MM-DD');
    var current_time = moment().format('HH:mm');
    if (booking_date < current_date) {
        res.status(400).send({
            message: "Booking date must be greater than or equal to current date"
        });
    } else if (!restaurant_id || isNaN(restaurant_id)) {
        res.status(400).send({
            message: "Invalid Restaurant"
        });
    } else if (current_time > booking_from && current_date == booking_date) {
        res.status(400).send({
            message: "can not be booked less than current time"
        });
    } else if (!customer_name || regex.test(customer_name) == false) {
        res.status(400).send({
            message: "Invalid Name"
        });
    } else if (!email || Email_regex.test(email) == false) {
        res.status(400).send({
            message: "Invalid Email"
        });
    } else if (!booking_date || date_regex.test(booking_date) == false) {
        res.status(400).send({
            message: "Invalid Booking Date"
        });
    } else if (booking_date > booking_prior) {
        res.status(400).send({
            message: "Booking can be done 7 days prior"
        });
    } else if (!booking_from || time_reg.test(booking_from) == false) {
        res.status(400).send({
            message: "Invalid Start time"
        });
    } else if (!booking_to || time_reg.test(booking_to) == false) {
        res.status(400).send({
            message: "Invalid End time"
        });
    } else if (!table_id || isNaN(table_id)) {
        res.status(400).send({
            message: "Invalid Restaurant"
        });
    } else if (!mobile || mobile_regex.test(mobile) == false) {
        res.status(400).send({
            message: "Invalid Mobile Number"
        });
    } else {
        req.getConnection(function(err, connection) {
            connection.query("SELECT id FROM restaurant WHERE id = ?", [restaurant_id], function(err, rows) {
                if (err) {
                    res.status(404).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length < 1) {
                        res.status(400).send({
                            message: "Restaurant not found"
                        });
                    } else {
                        connection.query("SELECT id FROM tables WHERE id = ?", [table_id], function(err, rows) {
                            if (err) {
                                res.status(404).send({
                                    message: "Database Error"
                                });
                            } else {
                                if (rows.length < 1) {
                                    res.status(400).send({
                                        message: "Table not found"
                                    });
                                } else {
                                    connection.query("select open_time, close_time from restaurant where id = ?", [restaurant_id], function(err, rows) {
                                        if (err) {
                                            res.status(404).send({
                                                message: "Database Error"
                                            });
                                        } else {
                                            if (rows[0].open_time > booking_from || rows[0].close_time < booking_to) {
                                                res.status(400).send({
                                                    message: "restaurant is closed at the moment"
                                                })
                                            } else {
                                                connection.query("select restaurant_id from bookings where (booking_from BETWEEN ? and ? or  booking_to BETWEEN ? and ? )  and restaurant_id = ? and table_id =? and booking_date = ? and status = ? ", [book_from, booking_to, book_from, booking_to, restaurant_id, table_id, booking_date, 1], function(err, rows) {
                                                    if (err) {
                                                        throw err;
                                                    } else {
                                                        if (rows.length > 0) {
                                                            res.status(400).send({
                                                                message: "Slot not available"
                                                            });
                                                        } else {
                                                            connection.query("insert into bookings set ?", req.body, function(err, rows) {
                                                                if (err) {
                                                                    res.status(400).send({
                                                                        message: "Database Error"
                                                                    });
                                                                } else {
                                                                    res.status(200).send({
                                                                        message: "booking confirmed"
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }

                                    })
                                }
                            }
                        });
                    }

                }
            })
        });
    }
}



module.exports.cancle_table = function(req, res) {
    var booking_id = req.body.booking_id;
    var moment = require('moment');

    if (!booking_id || isNaN(booking_id)) {
        res.status(400).send({
            message: "Invalid booking id"
        });
    } else {
        req.getConnection(function(err, connection) {
            if (!booking_id) {
                res.status(404).send({
                    message: "Invalid Booking"
                });
            } else {
                connection.query("select booking_date from bookings where id = ?", [booking_id], function(err, rows) {
                    if (err) {
                        res.status(404).send({
                            message: "Database error"
                        });
                    } else {
                        if (rows.length > 0) {
                            console.log(rows[0]);
                            var booking_date = rows[0].booking_date;
                            var current_date = moment().format('YYYY-MM-DD');
                            booking_date = moment(booking_date).format('YYYY-MM-DD');
                            if (booking_date < current_date) {
                                res.status(404).send({
                                    message: "Booking cannot be cancled as booked date is passed date"
                                });
                            } else {

                                connection.query("delete from bookings where id = ? and status = ?", [booking_id, 1], function(err, rows) {
                                    if (err) {
                                        res.status(404).send({
                                            message: "Database error"
                                        });
                                    } else {
                                        if (rows.affectedRows < 1) {
                                            res.status(404).send({
                                                message: "Booking not found"
                                            });
                                        } else {
                                            res.status(200).send({
                                                message: "Booking cancled"
                                            });
                                        }
                                    }
                                });
                            }
                        } else {
                            res.status(404).send({
                                message: "Booking not found"
                            });
                        }


                    }
                });
            }
        });
    }
}

module.exports.bookings_by_time = function(req, res) {
    var table_id = req.params.table_id;
    var start_date = req.params.start_date;
    var end_date = req.params.end_date;
    var date_regex = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    if (!table_id || isNaN(table_id)) {
        res.status(400).send({
            message: "Invalid table"
        });
    } else if (!start_date || date_regex.test(start_date) == false) {
        res.status(400).send({
            message: "Invalid Start Date"
        });
    } else if (!end_date || date_regex.test(end_date) == false) {
        res.status(400).send({
            message: "Invalid End date"
        });
    } else {
        req.getConnection(function(err, connection) {
            connection.query("select r.restaurant_name, t.table_no, t.capacity, b.booking_date,b.booking_from,b.booking_to,b.customer_name, b.mobile, b.email  from restaurant r,bookings b, tables t where b.table_id = t.id and b.table_id = ? and b.restaurant_id = r.id and b.status = ? and (b.booking_date BETWEEN ? and ?)", [table_id, 1, start_date, end_date], function(err, rows) {
                if (err) {
                    res.status(404).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length >= 1) {
                        res.status(200).send(rows);
                    } else {
                        res.status(200).send({
                            message: "No Record Found"
                        });
                    }
                }
            })
        })
    }
}

module.exports.search_restaurant = function(req, res) {
    var restaurant_name = req.body.restaurant_name;
    var locality = req.body.locality;
    var cuisines = req.body.cuisines;

    if (!restaurant_name && !locality && !cuisines) {
        res.status(404).send({
            message: "Select atleast one filter"
        });
    } else {
        req.getConnection(function(err, connection) {
            var searchQuery = " status = 1 ";
            var parameter = [1];
            if (restaurant_name) {
                searchQuery = searchQuery + "AND restaurant_name like  '%" + restaurant_name + "%'";
            }
            if (locality) {
                searchQuery = searchQuery + "AND locality like '%" + locality + "%'";
                parameter.push(locality);
            }

            if (cuisines) {
                searchQuery = searchQuery + "AND cuisines like '%" + cuisines + "%'";
                parameter.push(cuisines);
            }
            var sql = 'SELECT * FROM restaurant WHERE ' + searchQuery;
            connection.query(sql, function(err, rows) {
                if (err) {
                    res.status(400).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length < 1) {
                        res.status(400).send({
                            message: "No restaurant found"
                        });
                    } else {
                        res.status(200).send(rows);
                    }
                }
            });

        });
    }
}