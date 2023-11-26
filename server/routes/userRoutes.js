const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser } = require('../controller/userController')
const { protect } = require('../middleware/authMIddleWare')
const { upload } = require('../utils/upload')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update', upload.single("image"), updateUser)

module.exports = router