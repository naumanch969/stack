import express from "express"
const router = express.Router();
import { auth } from "../middleware/auth.js"
import { getSingleCode, getAllCodes, getUserCodes, createCode, updateCode, likeCode, commentCode, deleteCode, deleteCodeCollection } from "../controllers/code.js"


router.get('/getCode/:id', getSingleCode);
router.get('/getCodes', getAllCodes);
router.get('/getUserCodes', auth, getUserCodes);

router.post('/create', auth, createCode);

router.put('/update/:id', auth, updateCode);
router.put('/like/:id', auth, likeCode);
router.put('/comment/:id', auth, commentCode);

router.delete('/delete/:id', auth, deleteCode);
router.delete('/delete-codes', auth, deleteCodeCollection);



export default router