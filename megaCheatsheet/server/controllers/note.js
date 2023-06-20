import mongoose from "mongoose";
import Note from "../models/note.js";

export const getNote = async (req, res) => {
    try {
        const { id } = req.params
        console.log('id', id)

        const result = await Note.findById(id)

        if (!result) {
            res.status(400).json({ message: 'no note with this id', id })
        }
        else if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).send("no Note with this id")
            return false
        }
        else {
            res.status(200).json({ result, message: 'note get successfully' })
        }

    } catch (error) {
        console.log('error in getNote - controllers', error)
        res.status(404).json({ message: 'error in getNote - controllers', error })
    }

}







export const getAllNotes = async (req, res) => {
    try {

        const result = await Note.find()

        res.status(200).json({ result, message: 'all notes get successfully' })

    } catch (error) {
        console.log('error in getAllNotes - controllers', error)
        res.status(404).json({ message: 'error in getAllNotes - controllers', error })
    }
}






export const getUserNotes = async (req, res) => {
    try {
        const userId = req.userId

        const result = await Note.find({ user: userId })

        res.status(200).json({ result, message: `all notes of user ${id} get successfully` })

    } catch (error) {
        console.log('error in getAllNotes - controllers', error)
        res.status(404).json({ message: 'error in getAllNotes - controllers', error })
    }
}









export const createNote = async (req, res) => {
    try {
        let { note, tags, uploadedImages, type, createdAt, updatedAt, bg } = req.body
        updatedAt = ""              // updatedAt field should be empty at start
        const userId = req?.userId

        if (!userId) {
            res.status(401).json({ message: 'unautorized - you have to login first' })
        }
        else if (note?.length == 0 || typeof (note) == 'undefined') {
            console.log('note has no character - it is empty || note field is not provided ')
            res.status(401).json({ message: 'note has no character - it is empty || note field is not provided' })
        }
        else if (createdAt?.length == 0 || typeof (createdAt) == 'undefined') {
            console.log('createdAt has no character - it is empty || createdAt field is not provided ')
            res.status(401).json({ message: 'createdAt has no character - it is empty || createdAt field is not provided' })
        }
        else if (updatedAt?.length !== 0 || typeof (updatedAt) == 'undefined') {
            console.log('updatedAt field should be empty - it should not contain any string value || updatedAt field is not provided ')
            res.status(401).json({ message: 'updatedAt has no character - it is empty || updatedAt field is not provided' })
        }
        else if (typeof (tags) == 'undefined') {
            console.log(' tags field is not provided ')
            res.status(401).json({ message: 'tags field is not provided' })
        }
        else if (uploadedImages?.length == 0 || typeof (uploadedImages) == 'undefined') {
            console.log('uploadedImages has no character - it is empty || uploadedImages field is not provided ')
            res.status(401).json({ message: 'uploadedImages has no character - it is empty || uploadedImages field is not provided' })
        }
        else if (type?.length == 0 || typeof (type) == 'undefined') {
            console.log('type has no character - it is empty || type field is not provided ')
            res.status(401).json({ message: 'type has no character - it is empty || type field is not provided' })
        }
        else if (bg?.hex.length == 0 || typeof (bg) == 'undefined') {
            console.log('bg has no character - it is empty || bg field is not provided ')
            res.status(401).json({ message: 'bg has no character - it is empty || bg field is not provided' })
        }
        else {
            const result = await Note.create({ user: userId, note, tags, uploadedImages, type, createdAt, updatedAt, bg })
            res.status(200).json({ result, message: 'note created successfully' })
        }
    } catch (error) {
        console.log('error in createNote - controllers', error)
        res.status(404).json({ message: 'error in createNote - controllers', error })
    }
}











export const updateNote = async (req, res) => {
    try {
        const { note, tags, uploadedImages, type, createdAt, updatedAt, bg } = req.body
        const { id } = req.params
        const userId = req.userId
        const findedNote = await Note.findById(id)

        if (!findedNote) {
            res.status(401).json({ message: 'No note exist with this id', id })
        }
        else if (findedNote.createdAt !== createdAt) {                  // createdAt field should not be changed
            res.status(401).json({ message: `createdAt field ${createdAt} is different from that of stored in db ${findedNote.createdAt} ` })
        }
        else if (!userId) return res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
        else if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send("no Note with this id")
        else if (note?.length == 0 || typeof (note) == 'undefined') {
            console.log('note has no character - it is empty || note field is not provided ')
            res.status(401).json({ message: 'note has no character - it is empty || note field is not provided' })
        }
        else if (updatedAt?.length == 0 || typeof (updatedAt) == 'undefined') {
            console.log('updatedAt has no character - it is empty || updatedAt field is not provided ')
            res.status(401).json({ message: 'updatedAt has no character - it is empty || updatedAt field is not provided' })
        }
        else if (typeof (tags) == 'undefined') {
            console.log(' tags field is not provided ')
            res.status(401).json({ message: 'tags field is not provided' })
        }
        else if (uploadedImages?.length == 0 || typeof (uploadedImages) == 'undefined') {
            console.log('uploadedImages has no character - it is empty || uploadedImages field is not provided ')
            res.status(401).json({ message: 'uploadedImages has no character - it is empty || uploadedImages field is not provided' })
        }
        else if (type?.length == 0 || typeof (type) == 'undefined') {
            console.log('type has no character - it is empty || type field is not provided ')
            res.status(401).json({ message: 'type has no character - it is empty || type field is not provided' })
        }
        else if (bg.hex.length == 0 || typeof (bg) == 'undefined') {
            console.log('bg has no character - it is empty || bg field is not provided ')
            res.status(401).json({ message: 'bg has no character - it is empty || bg field is not provided' })
        }
        else {
            const result = await Note.findByIdAndUpdate(id, { note, tags, uploadedImages, type, updatedAt, bg }, { new: true })
            res.status(200).json({ result, message: 'note updated successfully' })
        }

    } catch (error) {
        console.log('error in updateNote - controllers', error)
        res.status(404).json({ message: 'error in updateNote - controllers', error })
    }
}









export const bookmarkNote = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId
        const findedNote = await Note.findById(id)

        if (!findedNote) {
            res.status(401).json({ message: 'No note exist with this id', id })
        }
        else if (!userId) return res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
        else if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send("no Note with this id")
        else {
            const result = await Note.findByIdAndUpdate(id, { bookmarked: !(findedNote.bookmarked) }, { new: true })
            res.status(200).json({ result, message: 'note bookmarkNote successfully' })
        }

    } catch (error) {
        console.log('error in bookmarkNote - controllers', error)
        res.status(404).json({ message: 'error in bookmarkNote - controllers', error })
    }
}








export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params

        const note = await Note.findById(id)

        if (!note) {
            res.status(401).json({ message: 'no note exist with this id', id })
        }
        else {
            const result = await Note.findByIdAndDelete(id)
            res.status(200).json({ result, message: 'note deleted successfully' })
        }

    } catch (error) {
        console.log('error in deleteNote - controllers', error)
        res.status(404).json({ message: 'error in deleteNote - controllers', error })
    }
}







export const deleteAllNotes = async (req, res) => {
    try {

        const result = await Note.deleteMany()
        res.status(200).json({ result, message: 'whole note collection deleted' })

    } catch (error) {
        console.log('error in deleteAllNotes - controllers', error)
        res.status(404).json({ message: 'error in deleteAllNotes - controllers', error })
    }
}
