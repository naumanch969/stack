const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const mongoose = require("mongoose")

const RegisterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 11,
        maxlength: 11,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 70,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail) {
                console.log("invalid password or email");
            }
        },
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'password should not be less than 8 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'password should not be less than 8 characters']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


RegisterSchema.methods.generateToken = async function () {
    const id = this.id
    const token = await jwt.sign({ _id: id }, "thisissecretkeyofmycookies")
    this.tokens = this.tokens.concat({ token: token })
    return token
}


RegisterSchema.pre("save", async function () {
    const password = this.password
    this.password = await bcrypt.hash(password, 10)
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10)
})



const Regiseration = new mongoose.model("Regiseration", RegisterSchema)

module.exports = Regiseration