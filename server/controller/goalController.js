const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc get Goals
//@route GET/api/goals
//@access private

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)

})

//@desc set Goals
//@route POST/api/goals
//@access private

const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
        // .json({ message: "Please add a text field" })
    }
    const goals = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    // console.log(req.body);
    res.status(200).json(goals)
})

//@desc update Goals
//@route PUT/api/goals/:id
//@access private

const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // const user = await User.findById(req.user.id)
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not autherized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    // res.status(200).json({ text: `getting data with put method ${req.params.id}` })
    res.status(200).json(updatedGoal)

})

//@desc delete Goals
//@route DELETE/api/goals/:id
//@access private

const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // const user = await User.findById(req.user.id)
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not autherized')
    }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })

})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}