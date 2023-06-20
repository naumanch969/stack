import mongoose from "mongoose";
import Activity from "../models/activity.js";







export const getActivity = async (req, res) => {
    try {
        const { id } = req.params

        const result = await Activity.findById(id)

        if (!result) {
            res.status(400).json({ message: 'no activity with this id', id })
        }
        else if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).send("no activity with this id")
        }
        else {
            res.status(200).json({ result, message: 'activity get successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in getactivity - controllers', error })
    }

}

export const getActivities = async (req, res) => {
    try {

        let result = await Activity.find()


        result = result.filter((item, index, self) =>          // here self = result
            index === self.findIndex((t) => (
                t.date.date === item.date.date
            ))
        );


        res.status(200).json({ result, message: 'all activities get successfully' })

    } catch (error) {

        res.status(404).json({ message: 'error in getAllactivitys - controllers', error })
    }
}

export const getUserActivity = async (req, res) => {
    try {
        const userId = req.userId

        let result = await Activity.find({ user: userId })

        let filteredResult = result.filter((item, index, self) =>          // here self = result
            index === self.findIndex((t) => (
                t.date.date === item.date.date
            ))
        );


        res.status(200).json({ result: filteredResult, message: `all activities of user ${userId} get successfully` })

    } catch (error) {

        res.status(404).json({ message: 'error in getUserActivities - controllers', error })
    }
}









export const createActivity = async (req, res) => {
    try {
        let { activity, date, bg } = req.body
        const userId = req?.userId

        let findedActivities = await Activity.find({ user: userId })


        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!activity) res.status(401).json({ message: 'activity field is not provided' })

        else if (!date) res.status(401).json({ message: 'date field is not provided' })

        else if (!bg) res.status(401).json({ message: 'bg field is not provided' })

        else {


            let arr = []
            findedActivities.map((act) => {
                if (act.date.date == date.date) {
                    arr.push(1)
                }
                else {
                    arr.push(0)
                }
            })

            if (arr.includes(1)) {

                // res.status(401).json({ message: `activity of date ${date.date} has already been created` })
            }
            else {
                const result = await Activity.create({ user: userId, activity, date, bg })
                res.status(200).json({ result, message: 'activity created successfully' })
            }


        }


    } catch (error) {

        res.status(404).json({ message: 'error in createactivy - controllers', error })
    }
}











export const addImage = async (req, res) => {
    try {
        let { file, url, timeLapseId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!file) res.status(401).json({ message: 'file field is not provided' })

        else if (!url) res.status(401).json({ message: 'url field is not provided' })

        else {

            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    timeLapse.uploadedImages.push({ file, url })
                }
            })

            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'image added successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in addImage - controllers', error })
    }
}

export const deleteImage = async (req, res) => {
    try {
        let { timeLapseId, imageId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })
        if (!timeLapseId) res.status(401).json({ message: 'timeLapseId field is not provided' })
        if (!imageId) res.status(401).json({ message: 'imageId field is not provided' })

        else {
            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    let index = timeLapse.uploadedImages.findIndex((i) => i._id == imageId)
                    timeLapse.uploadedImages.splice(index, 1)
                }
            })

            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'image deleted successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in deleteImage - controllers', error })
    }
}





export const updateText = async (req, res) => {
    try {
        let { text, timeLapseId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })


        else {
            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    timeLapse.text = text
                }
            })
            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'text updated successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in addText - controllers', error })
    }
}

export const updateHeading = async (req, res) => {
    try {
        let { heading, timeLapseId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!timeLapseId) res.status(401).json({ message: 'timeLapseId field is not provided' })

        else {

            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    timeLapse.heading = heading
                }
            })

            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'heading added successfully' })

        }

    } catch (error) {

        res.status(404).json({ message: 'error in updateHeading - controllers', error })
    }
}







export const addLink = async (req, res) => {
    try {
        let { link, timeLapseId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!link) res.status(401).json({ message: 'link field is not provided' })
        else if (!timeLapseId) res.status(401).json({ message: 'timeLapseId field is not provided' })

        else {

            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    timeLapse.links.push({ link })
                }
            })

            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'link added successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in addLink - controllers', error })
    }
}
export const updateLink = async (req, res) => {
    try {
        let { link, timeLapseId, linkId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!link) res.status(401).json({ message: 'link field is not provided' })
        else if (!timeLapseId) res.status(401).json({ message: 'timeLapseId field is not provided' })
        else if (!linkId) res.status(401).json({ message: 'linkId field is not provided' })

        else {

            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    let index = timeLapse.links.findIndex((l) => l._id == linkId)
                    timeLapse.links[index].link = link
                }
            })

            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'link added successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in updateLink - controllers', error })
    }
}
export const deleteLink = async (req, res) => {
    try {
        let { timeLapseId, linkId } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        if (!timeLapseId) res.status(401).json({ message: 'timeLapseId field not provided' })
        if (!linkId) res.status(401).json({ message: 'linkId field not provided' })

        else {
            findedActivity.activity.map((timeLapse) => {
                if (timeLapse._id == timeLapseId) {
                    let index = timeLapse.links.findIndex((h) => h._id !== linkId)
                    timeLapse.links.splice(index, 1)
                }
            })

            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'link deleted successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in deleteLink - controllers', error })
    }
}
























export const updateBg = async (req, res) => {
    try {
        let { bg } = req.body
        const { id } = req.params
        const userId = req.userId

        const findedActivity = await Activity.findById(id)

        if (!findedActivity) res.status(404).json({ message: 'no activity with this id ' })

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!bg) res.status(401).json({ message: 'bg field is not provided' })

        else {

            findedActivity.bg.color = bg.color
            findedActivity.bg.hex = bg.hex


            const result = await Activity.findByIdAndUpdate(id, findedActivity, { new: true })
            res.status(200).json({ result, message: 'activities updated successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in updateBg - controllers', error })
    }
}

export const updateActivity = async (req, res) => {
    try {
        let { activity, date, bg } = req.body
        const { id } = req.params
        const userId = req.userId

        if (!userId) res.status(401).json({ message: 'unautorized - you have to login first' })

        else if (!activity) res.status(401).json({ message: 'activity field is not provided' })

        else if (!date) res.status(401).json({ message: 'date field is not provided' })

        else if (!bg) res.status(401).json({ message: 'bg field is not provided' })

        else {
            const result = await Activity.findByIdAndUpdate(id, { activity, date, bg }, { new: true })
            res.status(200).json({ result, message: 'activities updated successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in updateactivity - controllers', error })
    }
}













export const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params

        const activities = await Activity.findById(id)

        if (!activities) {
            res.status(401).json({ message: 'no activiY exist with this id', id })
        }
        else {
            const result = await Activity.findByIdAndDelete(id)
            res.status(200).json({ result, message: 'activiY deleted successfully' })
        }

    } catch (error) {

        res.status(404).json({ message: 'error in deleteActiviY - controllers', error })
    }
}







export const deleteActivities = async (req, res) => {
    try {

        const result = await Activity.deleteMany()
        res.status(200).json({ result, message: 'whole activities collection deleted' })

    } catch (error) {

        res.status(404).json({ message: 'error in deleteAllActivities - controllers', error })
    }
}