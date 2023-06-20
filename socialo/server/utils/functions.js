import otpGenerator from 'otp-generator'
import nodemailer from "nodemailer"


export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isUndefined = (data) => {
    return typeof (data) == 'undefined'
}

export const generateOTP = (length) => {
    const otp = otpGenerator.generate(length, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    return otp
}

export const sendOTP = (to, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: process.env.SENDER_EMAIL, pass: process.env.SENDER_EMAIL_PASSWORD }
    });
    const mailOptions = { from: process.env.SENDER_EMAIL, to, subject: 'Verification', html: `<p>Your email verification code is ${otp}</p>` };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err)
        else return info
    });
}