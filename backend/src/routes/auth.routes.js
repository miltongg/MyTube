import {Router} from 'express'

import { signup, signin } from "../controllers/auth.controller.js"

const router = Router()

// CREATE USER //
router.post('/signup', signup)

// SIGN IN //
router.post('/signin', signin)

// OAUTH //
router.post('/google')

export default router