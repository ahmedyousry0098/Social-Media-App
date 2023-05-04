import joi from 'joi'
import mongoose from 'mongoose'

export const GENERAL_FIELDS = {
    Id: joi.string().custom((value, helper) => {
        return mongoose.Types.ObjectId.isValid(value) ? true : helper.message("In-valid Id")
    }),
    email: joi.string().email({maxDomainSegments:2}).min(10).max(50).messages({
        "any.required": "Email is Required",
        "string.email": "Email Not Valid.."
    }),
    password: joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)),
    confirmationPassword: joi.string(),
    file: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().positive().required(),
        dest: joi.string()
    }),
    files: joi.array().items(),
    postTitle: joi.string().regex(/^[A-Za-z0-9_-]{5,500}$/),
    postContent: joi.string().regex(/^[A-Za-z0-9_-]{5,5000}$/),
    CommentContent: joi.string().regex(/^[A-Za-z0-9_-]{1,500}$/),
}

export const isValid = (schema={}) => {
    return (req, res, next) => {
        const keys = {...req.body, ...req.params, ...req.query}
        if (req.file || req.files) {
            keys.file = req.file || req.files
        }
        const result = schema.validate(keys, {abortEarly: false})
        if (result?.error?.details) {
            return res.status(406).json({message: result.error.details})
        }
        next()
    }
}

export const isValidGraphQL = async (schema={}, inputVal) => {
    const {error} = schema.validate(inputVal, {abortEarly: false})
    if (error) {
        throw new Error(error)
    } else {
        return true
    }
}