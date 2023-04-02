import joi from 'joi'
import { GENERAL_FIELDS } from '../../middlewares/validation.js'

// Post
export const createPostSchema = joi.object({
    title: GENERAL_FIELDS.postTitle.required(),
    content: GENERAL_FIELDS.postContent.required(),
    file: GENERAL_FIELDS.file
}).required()

export const updatePostSchema = joi.object({
    postId: GENERAL_FIELDS.Id.required(),
    title: GENERAL_FIELDS.postTitle,
    content: GENERAL_FIELDS.postContent,
    file: GENERAL_FIELDS.file
}).required()

export const postIdSchema = joi.object({
    postId: GENERAL_FIELDS.Id.required()
}).required()

// Comment
export const createCommentSchema = joi.object({
    postId: GENERAL_FIELDS.Id.required(),
    content: GENERAL_FIELDS.CommentContent.required(),
}).required()

export const updateCommentSchema = joi.object({
    postId: GENERAL_FIELDS.Id.required(),
    commentId: GENERAL_FIELDS.Id.required(),
    content: GENERAL_FIELDS.CommentContent.required(),
}).required()

export const deleteCommentSchema = joi.object({
    postId: GENERAL_FIELDS.Id.required(),
    commentId: GENERAL_FIELDS.Id.required(),
}).required()

export const commentIdSchema = joi.object({
    postId: GENERAL_FIELDS.Id.required(),
    commentId: GENERAL_FIELDS.Id.required(),
}).required()