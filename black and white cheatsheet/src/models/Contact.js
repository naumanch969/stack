const mongoose = require("mongoose")
const validator = require("validator")

const ContactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    textarea:{
        type:String,
        required:String,
    }
})

const Contact = new mongoose.model("Contact",ContactSchema)

module.exports = Contact