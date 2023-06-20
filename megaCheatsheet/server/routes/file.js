import express from "express"
const router = express.Router();
import { createFile, createSubFile, deleteFile, deleteSubFile, updateFile, updateSubFile } from "../controllers/file.js"
import { auth } from "../middleware/auth.js"

router.put('/createFile', auth, createFile);                // creating file is a update folder process
router.put('/createSubFile', auth, createSubFile);          // creating file is a update folder process


router.put('/updateFile/:id', auth, updateFile);
router.put('/updateSubFile/:id', auth, updateSubFile);


router.put('/deleteFile/:id', auth, deleteFile);            // deleting file is also a update folder process  in this case
router.put('/deleteSubFile/:id', auth, deleteSubFile);      // deleting file is also a update folder process  in this case


export default router