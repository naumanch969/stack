import express from "express"
const router = express.Router();
import { getNote, getAllNotes, getUserNotes, createNote, updateNote, bookmarkNote, deleteNote, deleteAllNotes } from "../controllers/note.js"
import { auth } from "../middleware/auth.js"


router.get('/getNote/:id', getNote)
router.get('/getNotes', getAllNotes)
router.get('/getUserNotes', getUserNotes)

router.post('/createNote', auth, createNote)

router.put('/updateNote/:id', auth, updateNote)
router.put('/bookmarkNote/:id', auth, bookmarkNote)

router.delete('/deleteNote/:id', auth, deleteNote)
router.delete('/deleteNotes', auth, deleteAllNotes)



export default router