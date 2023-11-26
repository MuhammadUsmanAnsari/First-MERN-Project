
const mongoose = require('mongoose')
const imgSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Please add a image']
    },
})

module.exports = mongoose.model('ImageModel', imgSchema)
