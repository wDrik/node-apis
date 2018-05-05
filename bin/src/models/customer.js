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
    },
    roles: [{
        type: String,
        required: [true],
        enum: ['user', 'admin'],
        default: 'user'
    }]
})

module.exports = mongoose.model('Customer', schema)
