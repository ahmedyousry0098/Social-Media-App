import joi from 'joi'
import { GENERAL_FIELDS } from '../../middlewares/validation.js'

export const registerSchema = joi.object({
    firstName: joi.string().regex(/^[A-Za-z][a-z]{3,15}$/).required().messages({
        "string.pattern.base": "Please Enter Your First Name Without Special Characters",
        "any.required": "First Name is Required"
    }),
    lastName: joi.string().regex(/^[A-Za-z][a-z]{3,15}$/),
    email: GENERAL_FIELDS.email.required(),
    password: GENERAL_FIELDS.password.required().messages({
        "any.required": "Password is Required",
        "string.pattern.base": "Minimum five characters, at least one letter and one number"
    }),
    confirmationPassword: GENERAL_FIELDS.confirmationPassword.valid(joi.ref('password')).required().messages({
        "any.only": "Confirmation Password Must Equal Password",
        "any.required": "Confirmation Password is Required"
    }),
    role: joi.string().valid('User', 'Admin')
}).required()

export const loginSchema = joi.object({
    email: GENERAL_FIELDS.email.required(),
    password: GENERAL_FIELDS.password.required().messages({
        "any.required": "Password is Required",
        "string.pattern.base": "In-valid Password"
    })
}).required()