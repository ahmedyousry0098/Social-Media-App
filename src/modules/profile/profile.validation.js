import joi from 'joi'
import mongoose from 'mongoose'
import {GENERAL_FIELDS} from '../../middlewares/validation.js'

export const forgetPasswordSchema = joi.object({
    email: GENERAL_FIELDS.email.required()
}).required()

export const resetPasswordSchema = joi.object({
    email: GENERAL_FIELDS.email.required(),
    code: joi.string().length(4).required().messages({
        "any.required": "Code is Required",
        "string.base": "In-valid Code",
        "string.length": "In-valid Code"
    }),
    password: GENERAL_FIELDS.password.required().messages({
        "any.required": "Password is Required",
        "string.pattern.base": "In-valid Password"
    }),
    confirmationPassword: GENERAL_FIELDS.confirmationPassword.valid(joi.ref('password')).required().messages({
        "any.required": "Confirmation Password is Required",
        "any.only": "Confirmation Password Must Equal Password",
    }),
}).required()

export const changePasswordSchema = joi.object({
    profileId: GENERAL_FIELDS.Id.required().messages({
        "any.required": "ID is Required"
    }),
    oldPassword: GENERAL_FIELDS.password.required().messages({
        "any.required": "Old Password is Required",
        "string.pattern.base": "In-valid Password"
    }),
    password: GENERAL_FIELDS.password.required().messages({
        "any.required": "Password is Required",
        "string.pattern.base": "In-valid Password"
    }),
    confirmationPassword: GENERAL_FIELDS.confirmationPassword.valid(joi.ref('password')).required().messages({
        "any.required": "Confirmation Password is Required",
        "any.only": "Confirmation Password Must Equal Password",
    }),
}).required()

export const updateProfileSchema = joi.object({
    profileId: GENERAL_FIELDS.Id.required().messages({
        "any.required": "ID is Required"
    }),
    firstName: joi.string().regex(/^[A-Za-z][a-z]{3,15}$/).required().messages({
        "string.pattern.base": "Please Enter Your First Name Without Special Characters",
        "any.required": "First Name is Required"
    }),
    lastName: joi.string().regex(/^[A-Za-z][a-z]{3,15}$/),
})

export const pictrueSchema = joi.object({
    profileId: GENERAL_FIELDS.Id.required().messages({
        "any.required": "ID is Required"
    }),
    file: GENERAL_FIELDS.file.required()
}).required()