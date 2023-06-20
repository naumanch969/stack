import mongoose from "mongoose";
import Task from "../models/task.js";

// all days months years etc.
const currentDay = new Date().getDay()
const currentDate = new Date().getDate()
const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()
const currentHour = new Date().getUTCHours()
const currentMinute = new Date().getUTCMinutes()
const currentSecond = new Date().getUTCSeconds()

export const getTask = async (req, res) => {
    try {
        const { id } = req.params

        const result = await Task.findById(id)

        if (!result) {
            res.status(400).json({ message: 'no task with this id', id })
        }
        else if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).send("no task with this id")
        }
        else {
            res.status(200).json({ result, message: 'task get successfully' })
        }

    } catch (error) {
        res.status(404).json({ message: 'error in getTask - controllers', error })
    }

}







export const getAllTasks = async (req, res) => {
    try {

        const result = await Task.find()

        res.status(200).json({ result, message: 'all tasks get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getAllTasks - controllers', error })
    }
}






export const getUserTasks = async (req, res) => {
    try {
        const userId = req.userId

        const result = await Task.find({ user: userId })

        res.status(200).json({ result, message: `all tasks of user ${userId} get successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in getAllTasks - controllers', error })
    }
}









export const createTask = async (req, res) => {
    try {
        let { title, task, uploadedImages, bg } = req.body
        const userId = req?.userId

        if (!userId) {
            res.status(401).json({ message: 'unautorized - you have to login first' })
        }
        else if (typeof (title) == 'undefined') {
            res.status(401).json({ message: 'title field is not provided' })
        }
        else if (typeof (task) == 'undefined') {
            res.status(401).json({ message: 'task field is not provided' })
        }
        else if (typeof (uploadedImages) == 'undefined') {
            res.status(401).json({ message: ' uploadedImages field is not provided' })
        }
        else if (typeof (bg) == 'undefined') {
            res.status(401).json({ message: 'bg field is not provided' })
        }
        else {
            const result = await Task.create({
                user: userId, title, task, uploadedImages, bg, createdAt: {
                    day: currentDay,
                    date: currentDate,
                    month: currentMonth,
                    year: currentYear,
                    hour: currentHour,
                    minute: currentMinute,
                    second: currentSecond,
                }
            })
            res.status(200).json({ result, message: 'task created successfully' })
        }
    } catch (error) {
        res.status(404).json({ message: 'error in createtask - controllers', error })
    }
}











export const updateTask = async (req, res) => {
    try {
        const { title, task, uploadedImages, status, bg, updatedAt, favourite } = req.body
        const { id } = req.params
        const userId = req.userId
        const findedtask = await Task.findById(id)

        if (!findedtask) {
            res.status(401).json({ message: 'No task exist with this id', id })
        }
        else if (!userId) {
            res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
        }
        else if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(401).send("no task with this id || id is invalid. This may be due to mixing up ids of different collection i.e., providing user id instead of task id ")
        }
        else if (typeof (title) == 'undefined') {
            res.status(401).json({ message: 'title field is not provided' })
        }
        else if (typeof (task) == 'undefined') {
            res.status(401).json({ message: 'task field is not provided' })
        }
        else if (typeof (uploadedImages) == 'undefined') {
            res.status(401).json({ message: ' uploadedImages field is not provided' })
        }
        else if (bg?.hex.length == 0 || typeof (bg) == 'undefined') {
            res.status(401).json({ message: 'bg has no character - it is empty || bg field is not provided' })
        }
        else {
            const result = await Task.findByIdAndUpdate(id, {
                title, task, uploadedImages, bg, updatedAt: {
                    day: currentDay,
                    date: currentDate,
                    month: currentMonth,
                    year: currentYear,
                    hour: currentHour,
                    minute: currentMinute,
                    second: currentSecond,
                }
            }, { new: true })
            res.status(200).json({ result, message: 'task updated successfully' })
        }

    } catch (error) {
        res.status(404).json({ message: 'error in updatetask - controllers', error })
    }
}









export const bookmarkTask = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId
        const findedtask = await Task.findById(id)

        if (!findedtask) {
            res.status(401).json({ message: 'No task exist with this id', id })
        }
        else if (!userId) return res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
        else if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send("no task with this id")
        else {
            const result = await Task.findByIdAndUpdate(id, { bookmarked: !(findedtask.bookmarked) }, { new: true })
            res.status(200).json({ result, message: 'task bookmarktask successfully' })
        }

    } catch (error) {
        res.status(404).json({ message: 'error in bookmarktask - controllers', error })
    }
}








export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const task = await Task.findById(id)

        if (!task) {
            res.status(401).json({ message: 'no task exist with this id', id })
        }
        else {
            const result = await Task.findByIdAndDelete(id)
            res.status(200).json({ result, message: 'task deleted successfully' })
        }

    } catch (error) {
        res.status(404).json({ message: 'error in deleteTask - controllers', error })
    }
}







export const deleteAllTasks = async (req, res) => {
    try {

        const result = await Task.deleteMany()
        res.status(200).json({ result, message: 'whole task collection deleted' })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteAllTasks - controllers', error })
    }
}
