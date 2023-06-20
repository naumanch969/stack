import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    signUpDate: {
        type: {
            day: Number,
            date: Number,
            month: Number,
            year: Number,
            hour: Number,
            minute: Number,
            second: Number
        },
        default: {
            day: new Date().getDay(),
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds(),
        }
    },
    loginDate: {
        type: {
            day: Number,
            date: Number,
            month: Number,
            year: Number,
            hour: Number,
            minute: Number,
            second: Number
        },
        default: {}
    },
    tokens: [{
        title: String,
        token: String
    }]
})




const user = new mongoose.model("User", userSchema)
export default user