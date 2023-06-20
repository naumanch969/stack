import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    uploadedImages: {
        type: [{ file: Object, url: String }],
        requried: true
    },
    tags: {
        type: [String],
        default: []
    },
    type: {
        type: String,
        default: 'all'
    },
    bg: {
        type: { color: String, hex: String },
        default: { color: 'gray-900', hex: '202124' }
    },
    createdAt: {
        type: String,
        default: new Date()
    },
    updatedAt: {
        type: String,
    },
    bookmarked: {
        type: Boolean,
        default: false
    }
})

const noteModel = new mongoose.model('Notes', noteSchema)
export default noteModel