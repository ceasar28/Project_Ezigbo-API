const express = require("express");
const { SignInProduct } = require("..//controllers/productControl");

const router = express.Router();

// signingProduct endpoint

router.post("/product", SignInProduct);

module.exports = router;
