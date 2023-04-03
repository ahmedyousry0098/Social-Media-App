import {Router} from 'express'
import { 
    getAllUsers, 
    forgetPassword, 
    resetPassword, 
    changePassword, 
    updateProfile, 
    changeProfilePic, 
    changeProfileCover,
    logOut,
} from './profile.controller.js'
import {
    forgetPasswordSchema, 
    resetPasswordSchema, 
    changePasswordSchema, 
    updateProfileSchema,
    pictrueSchema
} from './profile.validation.js'
import { isAdmin, isAuthenticated } from '../../middlewares/isAuth.js'
import { asyncHandler } from '../../utils/ErrorHandling.js'
import { isValid } from '../../middlewares/validation.js'
import { uploadFile, validation } from '../../utils/uploadFile.js'

const router = Router()

router.get('/get-all-users', isAuthenticated, isAdmin, asyncHandler(getAllUsers))
router.post('/forget-password', isValid(forgetPasswordSchema), asyncHandler(forgetPassword))
router.patch('/reset-password', isValid(resetPasswordSchema), asyncHandler(resetPassword))
router.patch('/:profileId/change-password', isValid(changePasswordSchema), isAuthenticated, asyncHandler(changePassword))
router.put('/:profileId/update', isValid(updateProfileSchema), isAuthenticated, asyncHandler(updateProfile))
router.post(
    '/:profileId/change-profile-pic', 
    isAuthenticated,
    uploadFile({validationSchema:validation.image}).single('image'),
    isValid(pictrueSchema), 
    asyncHandler(changeProfilePic)
)
router.post(
    '/:profileId/change-profile-cover', 
    isAuthenticated,
    uploadFile({validationSchema:validation.image}).single('image'), 
    isValid(pictrueSchema),
    asyncHandler(changeProfileCover)
)
router.get('/:profileId/logout', isAuthenticated, asyncHandler(logOut))

export default router