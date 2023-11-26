const express = require("express")
const router = express.Router()
const { getProducts, setProducts, updateProducts, deleteProducts } = require('../controller/productController')

const { protect } = require('../middleware/authMIddleWare')

router.route('/').get(protect, getProducts).post(protect, setProducts)
router.route('/:id').put(protect, updateProducts).delete(protect, deleteProducts)

module.exports = router