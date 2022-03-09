const { createUser, getUser, getUserByEmail, getSingleUser, updateUser } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post("/", createUser);
router.get("/getUsers", checkToken, getUser);
router.put("/getUser/:id", checkToken, getSingleUser);
router.patch("/updateUser", checkToken, updateUser);
router.post("/login", getUserByEmail);

module.exports = router;