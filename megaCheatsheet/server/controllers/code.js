import Code from "../models/code.js"
import mongoose from "mongoose"





export const getSingleCode = async (req, res) => {
    const { id } = req.params
    try {

        const result = await Code.findById(id);
        if (!result) {
            res.status(400).json({ message: 'no codePost with this id', id })
        }
        else {
            res.status(200).json({ result })
        }

    } catch (error) {
        console.log("error in getSingleCode-controllers", error)
        res.status(500).json({ error, message: "error in getSingleCode-controllers" })
    }
}





export const getAllCodes = async (req, res) => {
    try {

        const result = await Code.find()
        res.status(200).json({ result })

    } catch (error) {
        console.log("error in getAllCodeCodes-controllers", error)
        res.status(500).json({ error, message: "error in getAllCodeCodes-controllers" })
    }
}











export const getUserCodes = async (req, res) => {
    try {

        const result = await Code.find({ user: req.userId })
        res.status(200).json({ result })

    } catch (error) {
        console.log("error in getUserCodes-controllers", error)
        res.status(500).json({ error, message: "error in getUserCodes-controllers" })
    }
}












export const createCode = async (req, res) => {
    const { title, code, tags, description, type } = req.body
    const userId = req.userId
    try {

        if (title?.length == 0 || typeof (title) == 'undefined') {
            console.log('title has no character - it is empty || title field is not provided ')
            res.status(401).json({ message: 'title  has no character - it is empty || title field is not provided' })
        }
        else if (code?.length == 0 || typeof (code) == 'undefined') {
            console.log('code has no character - it is empty || code field is not provided ')
            res.status(401).json({ message: 'code has no character - it is empty || code field is not provided' })
        }
        else if (description?.length == 0 || typeof (description) == 'undefined') {
            console.log('description has no character - it is empty || description field is not provided ')
            res.status(401).json({ message: 'description has no character - it is empty || description field is not provided' })
        }
        else if (type?.length == 0 || typeof (type) == 'undefined') {
            console.log('type has no character - it is empty || type field is not provided ')
            res.status(401).json({ message: 'type has no character - it is empty || type field is not provided' })
        }
        else if (typeof (tags) == 'undefined') {
            console.log(' tags field is not provided ')
            res.status(401).json({ message: 'tags field is not provided' })
        }

        else if (!userId) return res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 

        else {
            const result = await Code.create({ user: userId, title, description, type, code, tags });
            res.status(200).json({ result })
        }

    } catch (error) {
        console.log("error in createCode-controllers", error)
        res.status(500).json({ error, message: "error in createCode-controllers" })
    }
}













export const updateCode = async (req, res) => {
    const { title, code, tags, description, type } = req.body
    const userId = req.userId
    const { id } = req.params
    try {
        if (title?.length == 0 || typeof (title) == 'undefined') {
            console.log('title has no character - it is empty || title field is not provided ')
            res.status(401).json({ message: 'title  has no character - it is empty || title field is not provided' })
        }
        else if (code?.length == 0 || typeof (code) == 'undefined') {
            console.log('code has no character - it is empty || code field is not provided ')
            res.status(401).json({ message: 'code has no character - it is empty || code field is not provided' })
        }
        else if (description?.length == 0 || typeof (description) == 'undefined') {
            console.log('description has no character - it is empty || description field is not provided ')
            res.status(401).json({ message: 'description has no character - it is empty || description field is not provided' })
        }
        else if (type?.length == 0 || typeof (type) == 'undefined') {
            console.log('type has no character - it is empty || type field is not provided ')
            res.status(401).json({ message: 'type has no character - it is empty || type field is not provided' })
        }
        else if (tags?.length == 0 || typeof (tags) == 'undefined') {
            console.log('tags array has no element - it is empty || tags field is not provided ')
            res.status(401).json({ message: 'tags array has no element - it is empty || tags field is not provided' })
        }
        else if (!userId) return res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
        else if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send("no Code with this id")

        else {
            const result = await Code.findByIdAndUpdate(id, { title, description, code, tags }, { new: true });
            res.status(200).json({ result, message: "codeBlock updated successfully" })
        }
    } catch (error) {
        console.log("error in createCode-controllers", error)
        res.status(500).json({ error, message: "error in createCode-controllers" })
    }
}













export const likeCode = async (req, res) => {
    try {

        const { id } = req.params;    // id of Code which the user liked
        const userId = req.userId

        if (!userId) return res.json({ message: "Unauthenticated-you have to login first" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
        else if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send("no Code with this id")
        else {

            const code = await Code.findById(id)
            const index = await code?.likes.findIndex((id) => id === String(userId))  // findIndex loop through all the id's of user who liked the Code

            if (index === -1) {
                code.likes.push(userId)
            } else {
                console.log(code)
                code.likes = code?.likes.filter((id) => id !== String(userId))
            }

            const result = await Code.findByIdAndUpdate(id, code, { new: true })
            res.status(200).json({ result, message: 'successfully liked' })
        }
    } catch (error) {
        console.log("error in liking Code - controller", error)
        res.status(401).json({ message: "error in like Code controllers ", error })
    }
}


export const commentCode = async (req, res) => {
    try {
        const { id } = req.params;   // if of that particular code
        const userId = req.userId
        const { comment } = req.body;
        if (!userId) {                //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
            return res.json({ message: "Unauthenticated-you have to login first" })
        }
        else if (comment?.length == 0) {
            console.log(' comment field is not provided ')
            res.status(401).json({ message: 'comment  has no character - it is empty ||' })
        }
        else if (typeof (comment) == 'undefined') {
            console.log(' comment field is not provided ')
            res.status(401).json({ message: ' comment field is not provided' })
        }
        else {
            const code = await Code.findById(id)
            code.comments.push(comment)
            const result = await Code.findByIdAndUpdate(id, code, { new: true })
            res.status(200).json({ result, message: 'commented successfully' })
        }
    } catch (error) {
        console.log("error in comment code  - controller", error)
        res.status(401).json({ message: "error in comment Code controllers ", error })
    }
}





export const deleteCode = async (req, res) => {
    const { id } = req.params
    try {

        const code = await Code.findById(id)
        if (!code) {
            res.status(401).json({ message: 'no code exist with this id', id })
        }
        else {
            const result = await Code.findByIdAndDelete(id);
            res.status(200).json({ result, message: "codeBlock deleted successfully" })
        }

    } catch (error) {
        console.log("error in deleteCode-controllers", error)
        res.status(500).json({ error, message: "error in deleteCode-controllers" })
    }
}








export const deleteCodeCollection = async (req, res) => {

    try {
        const result = await Code.deleteMany();

        res.status(200).json({ result, message: 'whole code collection deleted' })

    } catch (error) {
        console.log("error in delete code collection -controllers", error)
        res.status(500).json({ error, message: "error in deleting code collection-controllers" })
    }
}









//  controller CastError: Cast to ObjectId failed for value "undefined" (type string) at path "_id" for model "Code"
//     at model.Query.exec (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\query.js:4891:21)
//     at model.Query.Query.then (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\query.js:4990:15)
//     at processTicksAndRejections (node:internal/process/task_queues:96:5) {
//   messageFormat: undefined,
//   stringValue: '"undefined"',
//   kind: 'ObjectId',
//   value: 'undefined',
//   path: '_id',
//   reason: BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer
//       at new BSONTypeError (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\bson\lib\error.js:41:28)
//       at new ObjectId (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\bson\lib\objectid.js:67:23)
//       at castObjectId (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\cast\objectid.js:25:12)
//       at ObjectId.cast (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\schema\objectid.js:246:12)
//       at ObjectId.SchemaType.applySetters (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\schematype.js:1201:12)
//       at ObjectId.SchemaType._castForQuery (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\schematype.js:1648:15)
//       at ObjectId.SchemaType.castForQuery (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\schematype.js:1636:15)
//       at ObjectId.SchemaType.castForQueryWrapper (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\schematype.js:1612:20)
//       at cast (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\cast.js:347:32)
//       at model.Query.Query.cast (C:\Users\Mg\Desktop\Stack\megaCheatsheet\server\node_modules\mongoose\lib\query.js:5319:12),
//   valueType: 'string'
// }
