const asyncHandler = require('express-async-handler')

const imgUpload = asyncHandler(async (req, res) => {
    // res.send(200).json(req.file)
    console.log(req.file);
})


module.exports = {
    imgUpload
}
