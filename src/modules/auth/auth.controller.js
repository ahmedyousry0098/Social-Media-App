import UserModel from '../../../DB/models/user.model.js'
import jwt from 'jsonwebtoken'
import {sendEmail} from '../../utils/sendEmail.js'
import {confirmEmailTamp} from '../../utils/templates/confirmEmail.js'
import { ResponseError, generalMsgs } from '../../utils/ErrorHandling.js'

export const register = async (req, res, next) => {
    const {firstName, lastName, email, password, role} = req.body
    if (await UserModel.findOne({email})) return next(new ResponseError('Email Already Exist', 409))
    const user = new UserModel({firstName, lastName, email, password, role})
    const savedUser = await user.save()
    if (!savedUser) return next(new ResponseError(`${generalMsgs.SERVER_ERROR}`, 500))
    const token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SIGNATURE, {expiresIn: 60*10})
    const confirmationLink = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}/${token}/confirm-email`
    const emailInfo = await sendEmail({
        to: user.email, 
        subject: 'Confirm Your Email', 
        html: confirmEmailTamp({userName: user.firstName, confirmationLink})
    })
    if (!emailInfo.accepted.length) {
        return next(new ResponseError('Cannot Send Email', 503))
    }
    return res.status(201).json({message: 'Done', savedUser})
}

export const confirmEmail = async (req, res, next) => {
    const {token} = req.params
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
    if (!decoded || !decoded.id) return next(new ResponseError('Wrong Authorization Key', 400))
    const confirmUser = await UserModel.findByIdAndUpdate(decoded.id, {isConfirmed: true}, {new: true})
    if (!confirmUser) return next(new ResponseError(`${generalMsgs.SERVER_ERROR}`, 500))
    return res.status(202).json({message: 'Confirmed'})
}

export const logIn = async (req, res, next) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if (!user) return next(new ResponseError('In-valid Login Informations', 400))
    if (!user.isPasswordMatch(password)) return next(new ResponseError('In-valid Login Informations', 400))
    if (user.isDeleted) return next(new ResponseError('Account has been deleted, try to sign up again', 401))
    if (!user.isConfirmed) return next(new ResponseError('Please Confirm Your Email First', 403))
    const logIn = await UserModel.findByIdAndUpdate(user._id, {isLoggedIn: true})
    if (!logIn) return next(new ResponseError(generalMsgs.SERVER_ERROR, 500))
    const token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SIGNATURE, {expiresIn: 60*60})
    return res.status(200).json({message: 'Logged In Successfully', token})
}
