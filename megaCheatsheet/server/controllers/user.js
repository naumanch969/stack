import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"



export const getAllUsers = async (req, res) => {
    try {
        const result = await User.find();

        res.status(200).json({ result })
    } catch (error) {
        console.log("error in gatAllUser-controllers", error)
        res.status(500).json({ error, message: "error in getAllUser-controllers" })
    }
}





export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, date } = req.body;
    try {

        const isUserExist = await User.findOne({ email })

        if (isUserExist) res.status(400).json({ message: "user with this email already exist" })

        else if (password !== confirmPassword) res.status(400).json({ message: "password and confirmPassword does not match" })

        else {

            const hashedPassword = await bcrypt.hash(password, 12)
            const result = await User.create({ firstName, lastName, email, password: hashedPassword, signUpDate: date, loginDate: {} })
            const token = jwt.sign({ email: result.email, id: result._id }, "secret") // , { expiresIn: "12h" }

            res.status(200).json({ result }) // ,token

        }
    } catch (error) {
        console.log("error in signup-controllers", error)
        res.status(500).json({ message: "something went wrong" })
    }
}






export const login = async (req, res) => {
    const { email, password, date } = req.body;
    console.log('req.body', req.body)

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "no user with this email" })

        const existingId = existingUser?._id
        const isPasswordCorrect = await bcrypt.compare(password, existingUser?.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "incorrect password" })

        const token = jwt.sign({ email: existingUser.email, password, id: existingUser._id }, "secret")//, { expiresIn: "12h" }

        const index = existingUser.tokens.length ? existingUser.tokens.findIndex((token) => token.title == 'authorization') : -1

        index == -1 && existingUser.tokens.push({ title: 'authorization', token })

        existingUser.loginDate = date
        const result = await User.findByIdAndUpdate(existingId, existingUser, { new: true })

        res.status(200).json({ result })

    } catch (error) {
        console.log("error in login-controllers", error)
        res.status(500).json({ message: "something went wrong" })
    }
}




export const deleteUser = async (req, res) => {
    try {
        const id = req.userId;

        const existingUser = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!existingUser) return res.status(404).json({ message: "no user with this email" }) //change
        if (!isPasswordCorrect) return res.status(400).json({ message: "incorrect password" }) //change

        const result = await User.findByIdAndDelete(id)

        res.status(200).json({ result })
    } catch (error) {
        console.log("error in delete-controllers", error)
        res.status(500).json({ error, message: "error in delete-controllers" })
    }
}







export const deleteWholeCollection = async (req, res) => {
    try {
        const result = await User.deleteMany();

        res.status(200).json({ result, message: 'whole collection deleted' })

    } catch (error) {
        console.log("error in delete whole collection -controllers", error)
        res.status(500).json({ error, message: "error in deleting whole collection-controllers" })
    }
}



