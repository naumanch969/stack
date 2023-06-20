import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    date: {
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
                uploadedImages: [
                    { file: Object, url: String }
                ]
            }
        ],
    },
})

const activityModel = new mongoose.model('Activities', activitySchema)
export default activityModel