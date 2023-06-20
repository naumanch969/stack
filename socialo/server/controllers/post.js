import mongoose from "mongoose";
import User from '../models/user.js'
import Post from "../models/post.js";
import { isUndefined } from '../utils/functions.js'

export const getPosts = async (req, res) => {
    try {
        const result = await Post.find()
        res.status(200).json({ result, message: 'all posts get successfully', success: true })
    } catch (error) {
        res.status(404).json({ message: 'error in getAllPosts - controllers', error, success: false })
    }
}
export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Post.find({ user: id })
        res.status(200).json({ result, message: 'all user posts successfully', success: true })
    } catch (error) {
        res.status(404).json({ message: 'error in getUserPosts - controllers', error, success: false })
    }
}

export const createPost = async (req, res) => {
    try {
        let { content, images, tags, hashTags, likes, comments, shares, styles, visibility, notifications } = req.body
        if (
            isUndefined(content)
            || isUndefined(images)
            || isUndefined(tags)
            || isUndefined(hashTags)
            || isUndefined(likes)
            || isUndefined(comments)
            || isUndefined(shares)
            || isUndefined(styles)
            || isUndefined(visibility)
            || isUndefined(notifications)
        ) return res.status(400).json({ message: "All fields are required - (content,images,tags,hashTags,likes,comments,shares,styles,visibility,notifications)", success: false })

        const userId = req?.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send("no user with this id")

        // if (!userId) return res.status(401).json({ message: 'unautorized - you have to login first', success: false })
        const result = await Post.create({ user: userId, content, images, tags, hashTags, likes, comments, shares, styles, visibility, notifications })

        res.status(200).json({ result, message: 'post created successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in createPost - controllers', error, success: false })
    }
}

export const updatePost = async (req, res) => {
    try {
        let { content, images, tags, hashTags, likes, comments, visibility } = req.body

        if (
            isUndefined(content)
            || isUndefined(images)
            || isUndefined(tags)
            || isUndefined(hashTags)
            || isUndefined(likes)
            || isUndefined(comments)
            || isUndefined(createdAt)
            || isUndefined(updatedAt)
            || isUndefined(visibility)
        ) {
            res.status(400).json({ message: "All fields are required - (content,images,tags,hashTags,likes,comments,createdAt,updatedAt,visibility)", success: false });
        }

        const userId = req?.userId
        if (!userId) return res.status(401).json({ message: 'unautorized - you have to login first', success: false })

        const result = await Post.create({ content, images, tags, hashTags, likes, comments, visibility })

        res.status(200).json({ result, message: 'post created successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in createPost - controllers', error, success: false })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.userId) return res.status(400).json({ message: "Unauthenticated-you have to login first", success: false })

        const post = await Post.findById(id)
        if (!post) return res.status(400).json({ message: "no post exist with this id", success: false });

        const index = post?.likes.findIndex((id) => id === String(req.userId))
        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const result = await Post.findByIdAndUpdate(id, post, { new: true })
        res.status(200).json({ result, message: 'post liked successfully', success: true })
    } catch (error) {
    }
}

export const commentPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        const post = await Post.findById(id)
        post.comments.push(value)
        const result = await Post.findByIdAndUpdate(id, post, { new: true })
        res.status(200).json({ result, message: 'post commented successfully', success: true })
    } catch (error) {
        res.status(404).json({ message: "error in comment post controllers ", error })
    }
}

export const deletePost = async (req, res) => {
    try {
        let { id } = req.params

        const post = await Post.findById(id)
        if (!post) return res.status(400).json({ message: "All fields are required - (content,images,tags,hashTags,likes,comments,createdAt,updatedAt,visibility)", success: false });

        const result = await Post.findByIdAndDelete(id)
        res.status(200).json({ result, message: 'post deleted successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in createPost - controllers', error, success: false })
    }
}

export const deletePostCollection = async (req, res) => {
    try {
        const result = await Post.deleteMany()
        res.status(200).json({ result, message: 'post collection deleted', success: true })
    } catch (error) {
        res.status(404).json({ message: 'error in deletePostCollection - controllers', error, success: false })
    }
}