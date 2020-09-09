const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("users", userSchema)