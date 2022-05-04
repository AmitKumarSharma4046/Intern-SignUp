const mongoose = require('mongoose')


const collegeSchema = new mongoose.Schema({

    name: { type: String, required: [true, "Enter your name"], unique: true },

    fullName: { type: String, required: [true, "Enter your  fullName"] },

    logoLink: { type: String, required: [true, "Enter a valid link"] },

    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true
})

module.exports = mongoose.model('College', collegeSchema) //colleges