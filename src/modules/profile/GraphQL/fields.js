import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import { userType } from "./type.js"
import UserModel from "../../../../DB/models/user.model.js"
import { ApiFeatures } from "../../../utils/ApiFeatures.js"
import { isValidGraphQL } from "../../../middlewares/validation.js"
import { getAllUsersSchema, getProfileSchema } from "../profile.validation.js"
import { isAuthenticatedGraphQL } from "../../../middlewares/isAuth.js"

export const getUserProfile = {
    type: userType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        authorization: {type: GraphQLString}
    },
    resolve: async (parent, args) => {

        await isValidGraphQL(getProfileSchema, args)
        await isAuthenticatedGraphQL(args.authorization)
        
        const user = await UserModel.findById(id)
        return user
    }
}

export const getAllUsers = {
    type: new GraphQLList(userType),
    args: {
        authorization: {type: GraphQLString},
        page: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        filter: {type: GraphQLString},
        sort: {type: GraphQLString},
        search: {type: GraphQLString}
    },
    resolve: async (parent, args) => {

        await isValidGraphQL(getAllUsersSchema, args)
        await isAuthenticatedGraphQL(args.authorization)
        
        const mongooseQuery = UserModel.find()
        const api = new ApiFeatures(mongooseQuery, args).paginate().search().sort()
        const users = await api.mongooseQuery
        return users
    }
}