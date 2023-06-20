import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    bg: {
        type: { color: String, hex: String },
    },
    activity: {
        type: [
            {
                time: String,
                text: String,
                heading: String,
                links: [{ link: String }],
                uploadedImages: Array
            }
        ],
    },
},{timestamps:true})

const activityModel = new mongoose.model('Activities', activitySchema)
export default activityModel