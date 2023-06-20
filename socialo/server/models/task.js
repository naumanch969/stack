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
        type:Array,
        requried: true
    },
    status: {
        type: String,
        default: 'active'           // active late completed
    },
    bg: {
        type: { color: String, hex: String },
        default: { color: 'purple-900', hex: '202124' }
    },
    favourite: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

const taskModel = new mongoose.model('Task', taskSchema)
export default taskModel