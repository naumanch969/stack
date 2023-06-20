import mongoose from "mongoose"


const codeSchema = ({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: [],
        required: true,
    },
    likes: {
        type: [String],
        default: [],
        required: true
    },
    comments: {
        type: [String],
        default: [],
        required: true,
    },
})


const code = new mongoose.model('Code', codeSchema)
export default code