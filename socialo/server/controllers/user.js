import User from '../models/user.js'
import OTP from '../models/otp.js'
import { isUndefined, sendOTP, isValidEmail, generateOTP } from '../utils/functions.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer"

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()
        res.status(200).json({ result: users, message: 'users get successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in getAllUsers - user.js - controllers', error, success: false })
    }
}
export const sendEmailVerificationOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'email field is required', success: false })
        if (!isValidEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const isEmailAlreadyReg = await User.findOne({ email })
        // in register user should not be registered already
        if (isEmailAlreadyReg) return res.status(400).json({ message: `user with email ${email} already resgistered `, success: false })

        const otp = generateOTP(6)
        const hashedOTP = await bcrypt.hash(otp, 12)
        await OTP.create({ email, otp: hashedOTP, name: 'register_otp' })

        sendOTP(email, otp)

        res.status(200).json({ result: otp, message: 'register_otp send successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in sendEmailVerificationOTP - controllers/user.js', error, success: false })
    }
}

export const register = async (req, res) => {
    try {
        const { name, userName, email, phone, password, DOB, location, gender, otp } = req.body


        if (!name || !userName || !email || !phone || !password || !DOB || !location || !gender || !otp) return res.status(400).json({
            message: 'name,userName,email,phone,password,location,gender,DOB,otp fields are required ', success: false
        })
        if (!isValidEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const isEmailAlreadyReg = await User.findOne({ email })
        if (isEmailAlreadyReg) return res.status(400).json({ message: `user with email ${email} already resgistered `, success: false })

        const otpHolder = await OTP.find({ email })
        if (otpHolder.length == 0) return res.status(400).json({ message: 'you have entered an exired otp', success: false })

        const email_verification_otps = otpHolder.filter(otp => otp.name == 'register_otp')
        const findedOTP = email_verification_otps[email_verification_otps.length - 1]           // otp may be sent multiple times to the user. So there may be multiple otps with user email stored in dbs. But we need only last one.

        const plainOTP = otp
        const hashedOTP = findedOTP.otp

        const validOTP = await bcrypt.compare(plainOTP, hashedOTP)
        if (!validOTP) return res.status(200).json({ message: 'wrong otp', success: false })

        const newUser = new User({ name, userName, email, phone, password, DOB, location, gender })
        await newUser.generateAuthToken()
        await newUser.save()

        await OTP.deleteMany({ email: findedOTP.email })

        return res.status(200).json({ result: newUser, message: 'register successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in register - controllers/user.js', error, success: false })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'make sure to provide all fields (email, password) ', success: false })

        const emailValidationFailed = !isValidEmail(email)
        if (emailValidationFailed) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(400).json({ message: `Invalid email`, success: false })

        const plainPassword = password
        const hashedPassword = existingUser?.password
        const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword)
        if (!isPasswordCorrect) return res.status(400).json({ message: `Invalid password`, success: false })

        const isTokenExist = Boolean(existingUser?.tokens?.find(token => token.name == 'auth_token'))
        if (isTokenExist) return res.status(201).json({ result: existingUser, message: `user with email ${email} already loged in`, success: true })

        const token = jwt.sign({ email, password, _id: existingUser._id }, process.env.AUTH_TOKEN_SECRET_KEY)
        const tokenObj = { name: 'auth_token', token }
        existingUser.tokens = existingUser.tokens.push(tokenObj)
        existingUser.loginAt = Date.now()
        const result = await User.findByIdAndUpdate(existingUser._id, existingUser, { new: true })

        res.status(200).json({ result, message: 'login successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'login failed - controllers/user.js', error, success: false })
    }
}
export const sendForgetPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const isEmailAlreadyReg = await User.findOne({ email })

        if (!email) return res.status(400).json({ message: 'email field is required', success: false })
        // in forget password route, user should be registered already
        if (!isEmailAlreadyReg) return res.status(400).json({ message: `no user exist with email ${email}`, success: false })
        if (!isValidEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const otp = generateOTP(6)
        const hashedOTP = await bcrypt.hash(otp, 12)
        const newOTP = await OTP.create({ email, otp: hashedOTP, name: 'change_password' })

        sendOTP(email, otp)

        res.status(200).json({ result: newOTP, otp, message: 'change_password send successfully', success: true })

    }
    catch (error) {
        res.status(404).json({ message: 'error in sendForgetPasswordOTP - controllers/user.js', error, success: false })
    }
}
export const changePassword = async (req, res) => {
    try {

        const { email, password, otp } = req.body
        if (!email || !password || !otp) return res.status(400).json({ message: 'make sure to provide all the fieds ( email, password, otp)', success: false })
        if (!isValidEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })


        const findedUser = await User.findOne({ email })
        if (!findedUser) return res.status(400).json({ message: `user with email ${email} is not exist `, success: false })


        const otpHolder = await OTP.find({ email })
        if (otpHolder.length == 0) return res.status(400).json({ message: 'you have entered an expired otp', success: false })

        const forg_pass_otps = otpHolder.filter(otp => otp.name == 'change_password')         // otp may be sent multiple times to user. So there may be multiple otps with user email stored in dbs. But we need only last one.
        const findedOTP = forg_pass_otps[forg_pass_otps.length - 1]

        const plainOTP = otp
        const hashedOTP = findedOTP.otp

        const isValidOTP = await bcrypt.compare(plainOTP, hashedOTP)

        if (isValidOTP) {
            const hashedPassword = await bcrypt.hash(password, 12)
            const result = await User.findByIdAndUpdate(findedUser._id, { name: findedUser.name, email, password: hashedPassword }, { new: true })

            await OTP.deleteMany({ email: findedOTP.email })

            return res.status(200).json({ result, message: 'password changed successfully', success: true })
        }
        else {
            return res.status(200).json({ message: 'wrong otp', success: false })
        }

    }
    catch (error) {
        res.status(404).json({ message: 'error in changePassword - controllers/user.js', error, success: false })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        const users = await User.find({ email })
        const user = users[0]
        if (!user) return res.status(400).json({ message: `user with email ${email} is not exist `, success: false })

        const result = await User.findByIdAndDelete(user._id)
        return res.status(200).json({ result, message: 'user deleted successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in deleteUser - controllers/user.js', error, success: false })
    }
}
export const deleteUserCollection = async (req, res) => {
    try {

        const result = await User.deleteMany()
        res.status(200).json({ result, message: `User collection deleted successfully`, success: true })

    } catch (error) {
        res.status(500).json({ error, message: "error in deleteUserCollection - controllers", success: false })
    }
}
export const removeAccount = async (req, res) => {
    try {
        const { id } = req.params;

        const users = await User.findById(id)
        const user = users[0]
        if (!user) return res.status(400).json({ message: `user not exist `, success: false })

        const userHasToken = Boolean(user.tokens.find(token => token.name == 'auth_token'))
        if (isUserHasNoToken) {      // user should have token, should be loggedIn in the browser atleast for the one time
            user.tokens = user.tokens.filter(token => token.name != 'auth_token')
        }

        const result = await User.findByIdAndUpdate(user._id, user, { new: true })
        return res.status(200).json({ result, message: 'user removeAccount successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in removeAccount - controllers/user.js', error, success: false })
    }
}
export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        const users = await User.findById(id)
        const user = users[0]
        if (!user) return res.status(400).json({ message: `user with id ${id} is not exist `, success: false })

        const result = await User.findByIdAndDelete(id)
        return res.status(200).json({ result, message: 'user removeAccount successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in removeAccount - controllers/user.js', error, success: false })
    }
}







export const sendRequest = async (req, res) => {    // this request is made by the sender
    try {
        let { receiverId } = req.params
        let { content, type } = req.body

        if (isUndefined(content) || isUndefined(type)) return res.status(400).json({ message: "All fields are required - (content, type)", success: false })

        const senderId = req?.userId
        if (!senderId) return res.status(401).json({ message: 'unautorized - you have to login first', success: false })

        const sender = await User.findById(senderId)
        if (!sender) return res.status(401).json({ message: 'wrong sender id', success: false })

        const receiver = await User.findById(receiverId)
        if (!receiver) return res.status(401).json({ message: "wrong receiver id", success: false })

        sender.sendRequests = sender.sendRequests.concat(receiverId)
        receiver.notifications = receiver.notifications.concat({ receiverId: sender._id, content, type })

        const updatedSender = await User.findByIdAndUpdate(senderId, sender, { new: true })
        const updatedReceiver = await User.findByIdAndUpdate(receiverId, receiver, { new: true })

        res.status(200).json({ result: { sender: updatedSender, receiver: updatedReceiver }, message: 'request send successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in sendRequest - controllers', error, success: false })
    }
}
export const removeRequest = async (req, res) => {  // this request is made by the sender
    try {
        let { receiverId } = req.params

        const senderId = req?.userId
        if (!senderId) return res.status(401).json({ message: 'unautorized - you have to login first', success: false })

        const sender = await User.findById(senderId)
        if (!sender) return res.status(401).json({ message: 'wrong sender/currentUser id', success: false })

        const receiver = await User.findById(receiverId)
        if (!receiver) return res.status(401).json({ message: "wrong receiver id", success: false })

        sender.sendRequests = sender.sendRequests.filter(requestId => String(requestId) !== String(receiverId))
        receiver.notifications = receiver.notifications?.filter(n => { n.type !== 'friend_request' && n.user !== senderId })

        const updatedSender = await User.findByIdAndUpdate(senderId, sender, { new: true })
        const updatedReceiver = await User.findByIdAndUpdate(receiverId, receiver, { new: true })

        res.status(200).json({ result: { sender: updatedSender, receiver: updatedReceiver }, message: 'request send successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in sendRequest - controllers', error, success: false })
    }
}
export const acceptRequest = async (req, res) => {  // this request is made by the receiver
    try {
        let { senderId } = req.params
        if (!req?.userId) return res.status(401).json({ message: 'unautorized - you have to login first', success: false })

        const sender = await User.findById(senderId)
        if (!sender) return res.status(401).json({ message: "wrong senderId", success: false })

        const accepter = await User.findById(req?.userId)
        if (!accepter) return res.status(401).json({ message: 'wrong receiverId ', success: false })

        const isAlreadyFriend = Boolean(sender.friends.find(senderFriendId => String(senderFriendId) == String(accepter._id)))

        if (!Boolean(sender.friends.find(senderFriendId => String(senderFriendId) == String(accepter._id)))) {
            sender.friends = sender.friends.concat(accepter._id)
            sender.sendRequests = sender.sendRequests.filter(requestId => String(requestId) != String(accepter._id))
        }
        if (!Boolean(accepter.friends.find(receiverFriendId => String(receiverFriendId) == String(sender._id)))) {
            accepter.friends = accepter.friends.concat(sender._id)
            accepter.notifications = accepter.notifications.filter(notification => String(notification.receiverId) != String(sender._id))
        }

        const updatedSender = await User.findByIdAndUpdate(sender._id, sender, { new: true })
        const updatedReceiver = await User.findByIdAndUpdate(accepter?._id, accepter, { new: true })

        res.status(200).json({ result: { sender: updatedSender, accepter: updatedReceiver }, message: 'friend request accepted successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in acceptRequest - controllers', error, success: false })
    }
}