import express from "express"
const router = express.Router();
import { getAllFolders, createFolder, createSubFolder, updateFolder, updateSubFolder, deleteFolder, deleteSubFolder, deleteFolderCollection } from "../controllers/folder.js"
import { auth } from "../middleware/auth.js"

router.get('/getFolders', auth, getAllFolders);

router.post('/createFolder', auth, createFolder);
router.put('/createSubFolder', auth, createSubFolder);

router.put('/updateFolder/:id', auth, updateFolder);
router.put('/updateSubFolder/:id', auth, updateSubFolder);

router.delete('/deleteFolder/:id', auth, deleteFolder);
router.put('/deleteSubFolder/:id', auth, deleteSubFolder);

router.delete('/deleteFolders', auth, deleteFolderCollection);





export default router