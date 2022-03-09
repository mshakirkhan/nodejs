const con = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        let values = [
            data.user_name, 
            data.user_email,
            data.user_pass
        ];
        let sql = "INSERT INTO tbl_user(user_name,user_email,user_pass) VALUES (?, ?, ?)";
        con.query(sql, values, (err, rows, feilds) => {
            if(!err) {
                return callback(null, rows);
            } else {
                return callback(err);
            }
        });
    },
    get: (callback) => {
        con.query("SELECT * FROM tbl_user", (err, rows, feilds) => {
            if(!err) {
                return callback(null, rows);
            } else {
                return callback(err);
            }
        });
    },
    getUserByEmail: (email, callback) => {
        con.query("SELECT * FROM tbl_user WHERE user_email = ?",[email],(err, rows, feilds) => {
            if(!err) {
                return callback(null, rows[0]);
            } else {
                return callback(err);
            }
        });
    },
    getUserByID: (id, callback) => {
        con.query("SELECT * FROM tbl_user WHERE user_id = ?", [id], (err, rows, feilds) => {
            if(!err) {
                return callback(null, rows[0]);
            } else {
                return callback(err);
            }
        }); 
    },
    updateUser: (data, callback) => {
        let value = [ 
            data.user_name, 
            data.user_email,
            data.user_pass,
            data.user_id,
        ];
        con.query("UPDATE tbl_user SET user_name = ?, user_email = ?, user_pass = ? WHERE user_id = ?", value, (err, rows, feilds) => {
            if(!err) {
                return callback(null, rows)
            } else 
            {
                return callback(err);
            }
        });
    }
}