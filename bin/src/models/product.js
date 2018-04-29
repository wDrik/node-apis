const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    active: {
        type: Boolean,
        required: [true, 'Active is required'],
        default: true
    },
    tags: [{
        type: String,
        required: [true, 'Tags is required']
    }]
})

module.exports = mongoose.model('Product', schema)
