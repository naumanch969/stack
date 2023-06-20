import express from "express"
const router = express.Router()
import { signup, login, deleteUser, getAllUsers, deleteWholeCollection } from "../controllers/user.js"
import { auth } from "../middleware/auth.js"

router.get("/all-users", getAllUsers)
router.post("/signup", signup)
router.put("/login", login)
router.delete("/delete", auth, deleteUser)
router.delete("/delete-user-collection", deleteWholeCollection)



export default router