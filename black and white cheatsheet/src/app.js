require("./db/conn")
require('dotenv').config()
const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const Regiseration = require("./models/Registeration")
const Contact = require("./models/Contact")
const auth = require("./middleware/auth")
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(staticPath))
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index", {
        html: "HTML",
        node: "Node",
        heading: "HTML",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/contact", (req, res) => {
    res.render("contact", {
        html: "HTML",
        node: "Node",
        heading: "HTML",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/registeration", (req, res) => {
    res.render("registeration", {
        html: "HTML",
        node: "Node",
        heading: "HTML",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/login", (req, res) => {
    res.render("login", {
        html: "HTML",
        node: "Node",
        heading: "HTML",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/html", auth, (req, res) => {
    res.render("html", {
        html: "HTML",
        node: "Node",
        heading: "HTML",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/cascading", auth, (req, res) => {
    res.render("cascading.hbs", {
        html: "CSS",
        node: "Node",
        heading: "CSS",
        css: "Javascript",
        javascript: "HTML",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "cascading",
        cssLink: "javascript",
        javascriptLink: "html",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/javascript", auth, (req, res) => {
    res.render("javascript", {
        html: "Javascript",
        node: "Node",
        heading: "Javascript",
        css: "HTML",
        javascript: "CSS",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "javascript",
        cssLink: "html",
        javascriptLink: "cascading",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/node", auth, (req, res) => {
    res.render("node", {
        html: "HTML",
        node: "Node",
        heading: "Node",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "MongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.get("/express", auth, (req, res) => {
    res.render("express", {
        html: "HTML",
        node: "Express",
        heading: "Express",
        express: "MongoDB",
        mongoDB: "Node",
        css: "CSS",
        javascript: "Javascript",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "express",
        epressLink: "mongodb",
        mongoDBLink: "node",
    })
})

app.get("/mongodb", auth, (req, res) => {
    res.render("mongodb", {
        html: "HTML",
        node: "MongoDB",
        heading: "MongoDB",
        express: "Node",
        mongoDB: "Express",
        css: "CSS",
        javascript: "Javascript",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "mongodb",
        epressLink: "node",
        mongoDBLink: "express",
    })
})


app.get("*", (req, res) => {
    res.render('404.hbs', {
        html: "HTML",
        node: "Node",
        heading: "HTML",
        css: "CSS",
        javascript: "Javascript",
        express: "Express",
        mongoDB: "mongoDB",
        htmlLink: "html",
        cssLink: "cascading",
        javascriptLink: "javascript",
        nodeLink: "node",
        epressLink: "express",
        mongoDBLink: "mongodb",
    })
})

app.post("/registeration", async (req, res) => {
    try {
        const { firstName, lastName, phone, age, email, gender, password, confirmPassword } = req.body;
        console.log("before register user")
        if (password === confirmPassword) {
            const registerUser = new Regiseration({ firstName, lastName, phone, age, email, gender, password, confirmPassword })
            const token = await registerUser.generateToken()
            res.cookie("jwt", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 5000000000),
                secure: true,
            });
            await registerUser.save()
            res.status(200).render("index");
        }
        else {
            res.render("unmatchPassword");
        }
    } catch (err) {
        res.send(err)
    }
})






















app.post("/login", async (req, res) => {
    try {
        const { password, email } = req.body
        const storedUser = await Regiseration.findOne({ email })
        const storedPassword = storedUser.password
        const compare = await bcrypt.compare(password, storedPassword)
        if (compare) {
            const token = await storedUser.generateToken()
            res.cookie("jwt", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000000000),
                secure: true
            })
            res.status(200).render("index")

        }
        else {
            res.render("password is not matching ")
        }
    } catch (err) {
        res.send(err)
    }
})

























app.post("/contact", async (req, res) => {
    try {

    } catch (err) {
        res.send(err)
    }
})



app.listen(port, () => {
    console.log(`server is running at the port ${port}`)
})