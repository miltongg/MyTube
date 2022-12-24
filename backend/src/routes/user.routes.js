import {Router} from 'express'

import verifyToken from "../middlewares/verifyToken.js";
import {update, deleteUser, getUser, unsubscribe, subscribe, like, dislike} from "../controllers/user.controller.js";

const router = Router()

// GET USER //
router.get('/:id', getUser)

// UPDATE USER //
router.put('/update/:id', verifyToken, update)

// LIKES //
router.put('/like/:id', verifyToken, like)

// DISLIKES //
router.put('/dislike/:id', verifyToken, dislike)

// DELETE USER //
router.delete('/:id', verifyToken, deleteUser)

// SUBSCRIBE //
router.put('/sub/:id', verifyToken, subscribe)

router.put('/unsub/:id', verifyToken, unsubscribe)

export default router