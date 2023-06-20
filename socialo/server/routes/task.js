import express from "express"
const router = express.Router();
import { getTask, getAllTasks, getUserTasks, createTask, updateTask, bookmarkTask, deleteTask, deleteAllTasks } from "../controllers/task.js"
import { auth } from "../middleware/auth.js"


router.get('/getTask/:id', getTask)
router.get('/getTasks', getAllTasks)
router.get('/getUserTasks', getUserTasks)

router.post('/createTask', auth, createTask)

router.put('/updateTask/:id', auth, updateTask)
router.put('/bookmarkTask/:id', auth, bookmarkTask)

router.delete('/deleteTask/:id', auth, deleteTask)
router.delete('/deleteTasks', auth, deleteAllTasks)



export default router