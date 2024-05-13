const express = require('express');
const { register, getProduct, getProductById, updateProduct, deleteProduct } = require('../Controllers/productController');
const router = express.Router();

router.post("/insertproduct", register);
router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);


module.exports = router
