import UserModel from '../../DB/models/user.model.js'
import jwt from 'jsonwebtoken'
import { ResponseError, generalMsgs, asyncHandler } from '../utils/ErrorHandling.js'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const {authentication} = req.headers
    if (!authentication || !authentication.startsWith(process.env.TOKEN_PREFIX)) (
        next(new ResponseError(generalMsgs.INVALID_TOKEN, 400))
    )
    const token = authentication.replace(process.env.TOKEN_PREFIX, "")
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
    if (!decoded || !decoded.id) (
        next(new ResponseError(generalMsgs.INVALID_TOKEN, 400))
    )
    const user = await UserModel.findById(decoded.id).select("-password")
    if (!user) (next(new ResponseError('User Not Found, Please Try To Sign Up First', 400)))
    req.user = user
    next()
})

export const isAdmin = asyncHandler(async (req, res, next) => {
    const {role} = req.user
    if (role === 'Admin') return next()
    next(new ResponseError('You do not have the permissions to do this action', 401))
})