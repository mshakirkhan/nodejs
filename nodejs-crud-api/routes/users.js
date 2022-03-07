const express = require('express');
const router = express.Router();
const con = require('../db/connection');
const Joi = require('joi');

// Getting User From Database
router.get('/getUser', (req, res) => {
    con.query("SELECT * FROM tbl_user", (err, rows, feilds) => {
        if(!err) {
            res.status(200).send({ userData : rows});
        } else {
            res.send(err);
        }
    });
});

// Getting User By ID
router.get('/getUser/:id', (req, res) => {
    con.query("SELECT * FROM tbl_user WHERE user_id = ?",[req.params.id], (err, rows, feilds) => {
        if(!err) {
            if(rows.length != 0) {
                res.send(rows);
            } else {
                res.status(404).send("No Record Found..");
            }
        } else {
            res.send(err);
        }
    });
});

// Adding New User
router.post('/addUser', (req, res) => {
    const schema = Joi.object({ 
        user_name: Joi.string().min(6).required(),
        user_email: Joi.string().email().required(),
        user_pass: Joi.string().min(4).required(),
    });
    const validation = schema.validate(req.body);
    if(validation.error) {
        res.status(400).send({ errors: validation.error.details[0].message});
        return;
    }
    else {
        let values = [
            req.body.user_name, 
            req.body.user_email,
            req.body.user_pass
        ];
        let sql = "INSERT INTO tbl_user(user_name,user_email,user_pass) VALUES (?, ?, ?)";
        con.query(sql, values, (err, rows, feilds) => {
            if(!err) {
                res.send({ message: "Record Inserted Successfully!"});
            } else {
                res.send(err);
            }
        });
    }
});

// Update User
router.put('/updateUser', (req, res) => {
    let value = [ 
        req.body.user_name, 
        req.body.user_email,
        req.body.user_pass,
        req.body.user_id,
    ];
    con.query("UPDATE tbl_user SET user_name = ?, user_email = ?, user_pass = ? WHERE user_id = ?", value, (err, rows, feilds) => {
        if(!err) {
            res.send({ message: "Record Updated Successfully!"});
        } else 
        {
            res.send(err);
        }
    });
});

module.exports = router;