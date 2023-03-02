const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");

const {addToCart,getUserCart} = require('../controllers/user');

router.post("/add-to-cart",verifyToken,addToCart);
router.post("/get-user-cart",verifyToken,getUserCart);



module.exports = router;

