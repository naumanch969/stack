import express from "express"
const router = express.Router()

import {
    getActivity,
    getActivities,
    getUserActivity,

    createActivity,

    updateActivity,
    updateBg,

    addLink,
    updateLink,
    deleteLink,

    updateHeading,

    addImage,
    deleteImage,
    updateText,

    deleteActivity,
    deleteActivities
} from "../controllers/activity.js"
import { auth } from "../middleware/auth.js"




router.get('/getActivity/:id', auth, getActivity)
router.get('/getActivities', auth, getActivities)
router.get('/getUserActivities', auth, getUserActivity)

router.post('/createActivity', auth, createActivity)

router.put('/updateActivity/:id', auth, updateActivity)
router.put('/updateBg/:id', auth, updateBg)

router.put('/addLink/:id', auth, addLink)
router.put('/updateLink/:id', auth, updateLink)
router.put('/deleteLink/:id', auth, deleteLink)

router.put('/updateHeading/:id', auth, updateHeading)

router.put('/addImage/:id', auth, addImage)
router.put('/deleteImage/:id', auth, deleteImage)

router.put('/updateText/:id', auth, updateText)


router.delete('/deleteActivity/:id', auth, deleteActivity)
router.delete('/deleteActivities', auth, deleteActivities)



export default router