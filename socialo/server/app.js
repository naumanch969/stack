import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import ntpClient from "ntp-client"
import cors from "cors"
import dotenv from 'dotenv'
const app = express()

import userRoutes from "./routes/user.js"
import notesRoutes from "./routes/note.js"
import activityRoutes from "./routes/activity.js"
import taskRoutes from "./routes/task.js"
import postRoutes from "./routes/post.js"
const PORT = process.env.PORT || 5000;

dotenv.config()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' })); // define the size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));	// define the size limit
app.use(bodyParser.json())
// app.use(express.json());


app.use('/user', userRoutes);
app.use('/note', notesRoutes);
app.use('/activity', activityRoutes);
app.use('/task', taskRoutes);
app.use('/post', postRoutes)



app.get("/", (req, res) => {
    res.status(200).send("App is Working")
})


mongoose.connect('mongodb://localhost:27017/Diary')
    .then(() => app.listen(PORT, () => console.log(`listening at port ${PORT}`)))
    .catch((err) => console.log(`the error to connect to mongodb is ${err} and error message is ${err.message} `))