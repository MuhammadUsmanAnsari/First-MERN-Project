const express = require("express")
const router = express.Router()
const ImageModel = require('../models/imgUploadModel')
const { upload } = require('../utils/upload')

router.post("/", upload.single("image"), async (req, res) => {
    const user = await ImageModel.create({
        image: req.file.filename,
    })

    try {
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router