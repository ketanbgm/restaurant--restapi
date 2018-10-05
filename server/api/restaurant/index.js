module.exports.list_restaurant = function(req, res) {
    req.getConnection(function(err, connection) {
        connection.query("select * from restaurant", function(err, rows) {
            if (err) {
                res.status(404).send({
                    message: "Database Error"
                });
            } else {
                if (rows.length >= 1) {
                    res.status(200).send(rows);
                } else {
                    res.status(200).send({
                        message: "No restaurant Found"
                    });
                }
            }
        })
    });
};

module.exports.get_restaurant = function(req, res) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query("select * from restaurant where id = ?", [id], function(err, rows) {
            if (err) {
                res.status(404).send({
                    message: "Database Error"
                });
            } else {
                if (rows.length > 0) {
                    res.status(200).send(rows);
                } else {
                    res.status(404).send({
                        message: "No Record Found"
                    });
                }
            }
        })
    })
}


module.exports.delete_restaurant = function(req, res) {
    var id = req.params.id;
    if (!id || isNaN(id)) {
        res.status(404).send({
            message: "Invalid Restaurant"
        });
    } else {


        req.getConnection(function(err, connection) {
            connection.query("select * from bookings where restaurant_id = ?", [id], function(err, rows) {
                if (err) {
                    res.status(404).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length > 0) {
                        res.status(409).send({
                            message: "Restuarant can not be deleted, Bookings exists"
                        });
                    } else {
                        connection.query("select * from tables where restaurant_id = ?", [id], function(err, rows) {
                            if (err) {
                                res.status(404).send({
                                    message: "Database Error"
                                });
                            } else {
                                if (rows.length > 0) {
                                    res.status(409).send({
                                        message: "Restuarant can not be deleted, Tables exists"
                                    });
                                } else {
                                    connection.query("delete from restaurant where id = ?", [id], function(err, rows) {
                                        if (err) {

                                            res.status(400).send({
                                                message: "Database Error"
                                            });

                                        } else {
                                            if (rows.affectedRows == 0) {
                                                res.status(404).send({
                                                    message: "Invalid Restaurant"
                                                });
                                            } else {
                                                res.status(200).send({
                                                    message: "Restaurant details deleted"
                                                });
                                            }
                                        }
                                    })
                                }
                            }
                        })

                    }
                }
            })

        })
    }
}
module.exports.add_table = function(req, res) {
    req.getConnection(function(err, connection) {
        var restaurant_id = req.body.restaurant_id;
        var table_no = req.body.table_no;
        var capacity = req.body.capacity;
        req.body.last_updated = new Date();
        if (!table_no) {
            res.status(400).send({
                message: "Invalid Table number"
            });
        } else if (!capacity || isNaN(capacity) || capacity == 0) {
            res.status(400).send({
                message: "Invalid capacity"
            });
        } else {
            connection.query("Select * from restaurant where id = ?", [restaurant_id], function(err, rows) {
                if (err) {
                    res.status(400).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length <= 0 || !restaurant_id || isNaN(restaurant_id)) {
                        res.status(404).send({
                            message: "Invalid Restaurant"
                        });
                    } else {
                        connection.query("Select * from tables where table_no = ? and restaurant_id = ?", [table_no, restaurant_id], function(err, rows) {
                            if (err) {
                                console.log(err)
                                res.status(400).send({
                                    message: "Database Error"
                                });
                            } else {
                                if (rows.length > 0) {
                                    res.status(404).send({
                                        message: "Table already Exists"
                                    });
                                } else {
                                    connection.query("INSERT INTO tables set ?", req.body, function(err, rows) {
                                        if (err) {
                                            res.status(400).send({
                                                message: "Database Error"
                                            });
                                        } else {
                                            res.status(200).send({
                                                message: "New table added to restaurant"
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
    })
}
module.exports.delete_table = function(req, res) {
    var id = req.params.id;
    if (!id || isNaN(id)) {
        res.status(404).send({
            message: "Invalid Table"
        });
    } else {
        req.getConnection(function(err, connection) {
            connection.query("select * from bookings where table_id = ? and status = ?", [id, 1], function(err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length > 0) {
                        res.status(409).send({
                            message: "Booking exists table can not be deleted"
                        });
                    } else {
                        connection.query("delete from tables where id = ?", [id], function(err, rows) {
                            if (err) {
                                console.log(err);
                                res.status(400).send({
                                    message: "Database Error"
                                });
                            } else {
                                if (rows.affectedRows == 0) {
                                    res.status(404).send({
                                        message: "Invalid Table"
                                    });
                                } else {
                                    res.status(200).send({
                                        message: "Table deleted"
                                    });
                                }
                            }
                        })
                    }
                }
            })
        })
    }
}

module.exports.update_table_capacity = function(req, res) {
    var id = req.params.id;
    var capacity = req.body.capacity;

    req.getConnection(function(err, connection) {
        if (!capacity || isNaN(capacity || capacity == 0)) {
            res.status(400).send({
                message: "Invalid capacity for table"
            });
        } else if (!id || isNaN(id)) {
            res.status(400).send({
                message: "Invalid table"
            });

        } else {
            var data = {
                capacity: capacity
            };
            connection.query("UPDATE tables set ? WHERE id = ? ", [data, id], function(err, rows) {
                if (err) {
                    res.status(400).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.affectedRows == 0) {
                        res.status(404).send({
                            message: "Invalid Restaurant"
                        });
                    } else {
                        res.status(200).send({
                            message: "table capacity updated"
                        });
                    }
                }
            })
        }
    })
}


module.exports.register_restaurant = function(req, res) {
    req.getConnection(function(err, connection) {
        var restaurant_name = req.body.restaurant_name;
        var email = req.body.email;
        var mobile = req.body.mobile;
        var type = req.body.type;
        var locality = req.body.locality;
        var cuisines = req.body.cuisines;
        var address = req.body.address;
        var city = req.body.city;
        var state = req.body.state;
        var open_time = req.body.open_time;
        var close_time = req.body.close_time;
        req.body.status = 1;
        req.body.last_update = new Date();
        var regex = /^[A-Za-z ]+$/;
        var Email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var mobile_regex = /^[789]\d{9}$/;
        var time_reg = new RegExp('^[0-9][0-9][:][0-9][0-9]$');

        if (!restaurant_name) {
            res.status(404).send({
                message: "Invalid name"
            });
        } else if (!email || Email_regex.test(email) == false) {
            res.status(404).send({
                message: "Invalid Email"
            });
        } else if (!mobile || mobile_regex.test(mobile) == false) {
            res.status(404).send({
                message: "Invalid mobile"
            });
        } else if (!type) {
            res.status(404).send({
                message: "Invalid type"
            });
        } else if (!locality) {
            res.status(404).send({
                message: "Invalid locality"
            });
        } else if (!address) {
            res.status(404).send({
                message: "Invalid address"
            });
        } else if (!city) {
            res.status(404).send({
                message: "Invalid city"
            });
        } else if (!state) {
            res.status(404).send({
                message: "Invalid state"
            });
        } else if (!open_time || time_reg.test(open_time) == false) {
            res.status(404).send({
                message: "Invalid open time"
            });
        } else if (!close_time || time_reg.test(close_time) == false) {
            res.status(404).send({
                message: "Invalid close time"
            });
        } else if (!cuisines) {
            res.status(404).send({
                message: "Invalid cuisines"
            });
        } else {
            connection.query("Select * from restaurant where email = ?", [email], function(err, rows) {
                if (err) {
                    res.status(404).send({
                        message: "Database Error"
                    });
                } else {
                    if (rows.length > 0) {
                        res.status(200).send({
                            message: "Email id already exists"
                        });
                    } else {
                        connection.query("Select * from restaurant where mobile = ?", [mobile], function(err, rows) {
                            if (err) {
                                res.status(404).send({
                                    message: "Database Error"
                                });
                            } else {
                                if (rows.length > 0) {
                                    res.status(200).send({
                                        message: "Mobile already exists"
                                    });
                                } else {
                                    connection.query("INSERT INTO restaurant set ?", req.body, function(err, rows) {

                                        if (err) {
                                            res.status(404).send({
                                                message: err
                                            });
                                        } else {
                                            res.status(200).send({
                                                message: "New Restaurant Onboarded"
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
    });
};