const { createUser, getUser, getUserByEmail } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post("/", createUser);
router.get("/getUsers", checkToken, getUser);
router.post("/login", getUserByEmail);

module.exports = router;