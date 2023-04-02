import { Router } from 'express'
import { createPost, deletePost, getUserPosts, likePost, unlikePost, updatePost } from './controller/post.controller.js'
import {addComment, likeComment, unlikeComment} from './controller/comment.controller.js'
import { uploadFile, validation } from '../../utils/uploadFile.js'
import { isAuthenticated } from '../../middlewares/isAuth.js'
import { isValid } from '../../middlewares/validation.js'
import { createPostSchema, updatePostSchema, postIdSchema, createCommentSchema, commentIdSchema, updateCommentSchema, deleteCommentSchema } from './post.validation.js'
import { asyncHandler } from '../../utils/ErrorHandling.js'

const router = Router()

// Post
router.get('/get-my-posts', isAuthenticated, asyncHandler(getUserPosts))
router.post(
    '/create', 
    isAuthenticated, 
    uploadFile({validationSchema: validation.image}).single('image'), 
    isValid(createPostSchema), 
    asyncHandler(createPost)
)
router.patch(
    '/:postId/update', 
    isAuthenticated, 
    uploadFile({validationSchema: validation.image}).single('image'), 
    isValid(updatePostSchema), 
    asyncHandler(updatePost)
    )
router.patch('/:postId/like', isValid(postIdSchema), isAuthenticated, asyncHandler(likePost))
router.patch('/:postId/unlike', isValid(postIdSchema), isAuthenticated, asyncHandler(unlikePost))
router.patch('/:postId/delete', isValid(postIdSchema), isAuthenticated, asyncHandler(deletePost))

// Comment
router.post('/:postId/add-comment', isValid(createCommentSchema), isAuthenticated, asyncHandler(addComment))
router.patch('/:postId/like-comment/:commetId', isValid(commentIdSchema), isAuthenticated, asyncHandler(likeComment))
router.patch('/:postId/unlike-comment/:commetId', isValid(commentIdSchema), isAuthenticated, asyncHandler(unlikeComment))
router.patch('/:postId/update-comment/:commetId', isValid(updateCommentSchema), isAuthenticated, asyncHandler(unlikeComment))
router.patch('/:postId/delete-comment/:commentId', isValid(deleteCommentSchema), isAuthenticated, asyncHandler(deletePost))

export default router