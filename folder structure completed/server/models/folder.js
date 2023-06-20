import mongoose from "mongoose"

const fileSchema = {
    fileName: String,
    icon: String
}

const folderSchema = {
    folderName: String,
    files: {
        type: [fileSchema],
        default: []
    }
}

const folders = mongoose.Schema({
    user: String,
    folderName: String,
    folders: {
        type: [folderSchema],
        default: []
    },
    files: {
        type: [fileSchema],
        default: []
    }
})


const folderModel = new mongoose.model("Folders", folders)
export default folderModel




