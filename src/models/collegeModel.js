const { links } = require('express/lib/response')
const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({

    name: { type: String, required: [true, "Enter your name"], unique: true },

    fullName: { type: String, required: [true, "Enter your  fullName"] },

    logoLink: { type: String, required: [true, "Enter a valid link"] },

    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true
})

module.exports = mongoose.model('College', authorSchema) //colleges