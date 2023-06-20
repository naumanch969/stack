import express from "express"
const router = express.Router();
import { createFile, deleteFile, updateFile } from "../controllers/folder.js"
import { auth } from "../middleware/auth.js"

router.put('/create', auth, createFile);        // creating file is a update folder process
router.put('/update/:id', auth, updateFile);
router.put('/delete/:id', auth, deleteFile);   // deleting file is also a update folder process  in this case


export default router