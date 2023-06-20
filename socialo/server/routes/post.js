import express from "express"
const router = express.Router();
import { getPosts, getUserPosts, createPost, updatePost, likePost, commentPost, deletePost, deletePostCollection } from "../controllers/post.js"
import { auth } from "../middleware/auth.js"


router.get('/get-all-posts', auth, getPosts)
router.get('/get-user-posts/:id', auth, getUserPosts)
router.post('/create', auth, createPost)
router.put('/update', auth, updatePost)
router.put('/like/:id', auth, likePost)
router.put('/comment/:id', auth, commentPost)
router.delete('/delete', auth, deletePost)
router.delete('/delete-collection', auth, deletePostCollection)


export default router

// import {body} from 'express-validator'
// const postDataValidate = [
//     body('title', 'Enter the valid title').isLength({ min: 3 }),
//     body('discription', 'discription must be atleast 5 charcters').isLength({ min: 5 })
// ]