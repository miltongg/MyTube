import {Router} from 'express'

import verifyToken from "../middlewares/verifyToken.js"
import { update, deleteUser, getUser, unsubscribe, subscribe } from "../controllers/user.controller.js"
import {addComment, deleteComment, getComments} from "../controllers/comment.controller.js"

const router = Router()

// ADD COMMENT //
router.post('/', verifyToken, addComment)

// GET COMMENTS //
router.get('/:videoId', getComments)

// DELETE COMMENT //
router.delete('/delete/:id', verifyToken, deleteComment)

export default router