//importing modules
const express = require("express");
const userController = require("../controllers/authController");
const { signup, login, logout } = userController;
const userAuth = require("../middlewares/authMiddleware");

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

//logout route
router.post("/logout", logout);

module.exports = router;
