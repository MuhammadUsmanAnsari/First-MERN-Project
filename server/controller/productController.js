const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

//getting all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id })
    res.status(200).json(products)

})

// adding product
const setProducts = asyncHandler(async (req, res) => {
    const { title, description, category, price, image } = req.body

    if (!title) {
        res.status(400).json({ error: "Please add title" })
    }
    if (!category) {
        res.status(400).json({ error: "Please add category" })
    }
    if (!price) {
        res.status(400).json({ error: "Please add price" })
    }
    if (!image) {
        res.status(400).json({ error: "Please add image" })
    }

    const products = await Product.create({
        title,
        image,
        description,
        category,
        price,
        user: req.user.id
    })

    res.status(200).json(products)
})

// updating the product 
const updateProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400).json({ error: "Product not found" })
    }

    if (!req.user) {
        res.status(400).json({ error: "User not found" })
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401).json({ error: "User not autherized" })
    }

    const updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedproduct)

})


// deleting the product
const deleteProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400).json({ error: "Product not found" })
    }

    if (!req.user) {
        res.status(401).json({ error: "User not found" })
    }
    if (product.user.toString() !== req.user.id) {
        res.status(401).json({ error: "User not autherized" })
    }

    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getProducts,
    setProducts,
    updateProducts,
    deleteProducts
}