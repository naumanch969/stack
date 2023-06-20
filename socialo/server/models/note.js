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
    uploadedImages:Array,
    tags: {
        type: Array,
        default: []
    },
    type: {
        type: String,
        default: 'all'
    },
    bg: {
        type: { color: String, hex: String },
        default: { color: 'purple-900', hex: '202124' }
    },  
    bookmarked: {
        type: Boolean,
        default: false
    }
}, {timestamps:true} )

const noteModel = new mongoose.model('Notes', noteSchema)
export default noteModel