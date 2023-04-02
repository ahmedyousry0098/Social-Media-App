import {Router} from 'express'
import { register, confirmEmail, logIn } from './auth.controller.js'
import { registerSchema, loginSchema } from './auth.validation.js'
import { asyncHandler } from '../../utils/ErrorHandling.js'
import { isValid } from '../../middlewares/validation.js'

const router = Router()

router.post('/register', isValid(registerSchema), asyncHandler(register))

router.get('/:token/confirm-email', asyncHandler(confirmEmail))

router.post('/login', isValid(loginSchema), asyncHandler(logIn))

export default router