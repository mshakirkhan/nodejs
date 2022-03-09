const { create, get, getUserByEmail } = require("./user.service");
require('dotenv').config();
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.user_pass = hashSync(body.user_pass, salt);
        create(body, (err, result) => {
            if(!err) {
                return res.status(200).json({
                    success: 1,
                    message: result
                });
            } else {
                return res.status(500).json({
                    success: 0,
                    message: "Failed"
                })
            }
        });
    },
    getUser: (req, res) => {
        get((err, result) => {
            if(!err) {
                return res.status(200).json({
                    success: 1,
                    data: result
                });
            } else {
                return res.status(500).json({
                    success: 0,
                    message: "Failed"
                })
            }
        });
    },
    getUserByEmail: (req, res) => {
        let body = req.body;
        getUserByEmail(body.user_email, (err, results) => {
            if(err) {
                return res.status(500).json({
                    success: 0,
                    message: "Failed"
                });
            } if(!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Invalid Username Or Password."
                })
            }
            let result = compareSync(body.user_pass, results.user_pass);
            if(result) {
                results.user_pass = undefined;
                const jsonwebtoken = sign({ result: results }, process.env.JWT_TOKEN, {
                    expiresIn:"1h"
                });
                return res.json({
                    success: 1,
                    message: "Loggin Successfully..",
                    token: jsonwebtoken
                });
            } else {
                return res.status(200).json({
                    success: 0,
                    message: "Invalid Username Or Password."
                })
            }
        });
    }
}