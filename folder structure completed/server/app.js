import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import cors from "cors"
const app = express()

import userRoutes from "./routes/user.js"
import folderRoutes from "./routes/folder.js"
import fileRoutes from "./routes/file.js"
import codeRoutes from "./routes/code.js"
const PORT = process.env.PORT || 5500;


app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRoutes);
app.use('/code', codeRoutes);
app.use('/folder', folderRoutes);
app.use('/file', fileRoutes);

app.get("/", (req, res) => {
    res.status(200).send("App is Working")
})

mongoose.connect('mongodb://localhost:27017/MegaCheatsheet')
    .then(() => app.listen(PORT, () => console.log(`listening at port ${PORT}`)))
    .catch((err) => console.log(`the error to connect to mongodb is ${err} and error message is ${err.message} `))