const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'E-mail is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
})

module.exports = mongoose.model('Customer', schema)
