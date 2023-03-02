const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const {isAdmin} = require("../controllers/auth");
const {addProduct,getAllProduct,updateProduct,getProductById,deleteProducts,addToCart} = require('../controllers/product');

router.post("/add",verifyToken,addProduct);
router.get("/get/all",verifyToken,getAllProduct);
router.post("/update",verifyToken,updateProduct);
router.get("/product/:id",verifyToken,getProductById);
router.post("/delete-product",verifyToken,deleteProducts);





module.exports = router;