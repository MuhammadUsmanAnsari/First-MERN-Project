const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// register new user
const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
        res.status(400).json({ error: "Please add all fields" })
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400).json({ error: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email,
        name,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ error: "Something went wrong" })
    }
})


// login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ error: "Invalid User Data" })
    }
})


// update user
const updateUser = asyncHandler(async (req, res) => {
    const { password, email, name } = req.body
    let updatedData;

    if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        updatedData = {
            ...req.body,
            password: hashedPassword
        }
    } else {
        updatedData = { ...req.body }
    }


    const updatedUser = await User.findByIdAndUpdate(req.body._id, updatedData, { new: true })
    if (updatedUser) {
        let data = {
            name: updatedUser.name,
            email: updatedUser.email,
            _id: updatedUser._id,
            token: generateToken(req.body._id)
        }
        res.status(201).json(data)
    } else {
        res.status(400).json({ error: "Invalid User Data" })
    }
})


// generating token
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    updateUser
}
