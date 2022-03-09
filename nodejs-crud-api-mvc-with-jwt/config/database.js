var mysql = require('mysql');
require('dotenv').config();

let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

con.connect((err) => {
    if(!err) {
        console.log("Database Connected..")
    }
    else {
        console.log("DB Connection Failed..")
    }
})

module.exports = con;