import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    uploadedImages: {
        type: [{ file: Object, url: String }],
        requried: true
    },
    status: {
        type: String,
        default: 'active'           // active late completed
    },
    bg: {
        type: { color: String, hex: String },
        default: { color: 'gray-900', hex: '202124' }
    },

    createdAt: {
        type: {
            day: Number,
            date: Number,
            month: Number,
            year: Number,
            hour: Number,
            minute: Number,
            second: Number
        }
    },
    updatedAt: {
        type: String,
    },
    favourite: {
        type: Boolean,
        default: false
    }
})

const taskModel = new mongoose.model('Task', taskSchema)
export default taskModel