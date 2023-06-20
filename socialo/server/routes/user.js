import {
    getAllUsers,
    sendEmailVerificationOTP,
    register,
    login,
    removeAccount,
    sendForgetPasswordOTP,
    changePassword,
    deleteUser,
    deleteUserCollection,

    sendRequest,
    removeRequest,
    acceptRequest,
} from "../controllers/user.js"

import express from "express"
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/get-all-users', getAllUsers)    // adminAuth,
router.post('/send-register-otp', sendEmailVerificationOTP)
router.post('/register', register)
router.put('/login', login)
router.put('/remove', removeAccount)
router.post('/send-forget-password-otp', sendForgetPasswordOTP)
router.put('/change-password', changePassword)
router.put('/delete-user', deleteUser)
router.delete('/delete-user-collection', deleteUserCollection)//   




router.put('/friend/send-request/:receiverId', auth, sendRequest)
router.put('/friend/remove-request/:receiverId', auth, removeRequest)
router.put('/friend/accept-request/:senderId', auth, acceptRequest)



export default router