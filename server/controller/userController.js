const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc register new users
//@route POST/api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
        res.status(400).json({ error: "Please add all fields" })
        // throw new Error("Please add all fields")
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400).json({ error: "User already exists" })
        // throw new Error("User already exists")
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
            // password:user.password
        })
    } else {
        res.status(400).json({ error: "Something went wrong" })
        // throw new Error("Something went wrong")
    }
})

//@desc login users
//@route POST/api/users/login
//@access public
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
        // throw new Error("Invalid User Data")
    }
    // res.json({ message: 'login user' })
})

//@desc getting users data
//@route GET/api/users/me
//@access public

const getMe = asyncHandler(async (req, res) => {
    // const { email, name, _id } = await User.findById(req.user.id)
    // res.status(200).json({
    //     id: _id,
    //     name,
    //     email,
    // })
    res.status(200).json(req.user)
    res.json({ message: 'User data' })
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
    getMe
}
