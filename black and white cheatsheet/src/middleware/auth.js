require('dotenv').config()
const jwt = require("jsonwebtoken")
const Regiseration = require('../models/Registeration')

g
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verifiedUser = await jwt.verify(token, "thisissecretkeyofmycookies")
        const id = verifiedUser._id
        const user = await Regiseration.findOne({ _id: id })
        req.token = token;
        req.user = user;
        next()
    } catch (err) {
        res.render("auth.hbs", {
            frontend: "HTML",
            backend: "Node",
            heading: "HTML",
            other1: "CSS",
            other2: "Javascript",
            other3: "Express",
            other4: "mongoDB",
            link1: "html",
            link2: "cascading",
            link3: "javascript",
            link4: "node",
            link5: "express",
            link6: "mongodb",
        })
    }
}

module.exports = auth