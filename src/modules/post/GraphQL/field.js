import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { postType } from "./type.js";
import { isAuthenticatedGraphQL } from "../../../middlewares/isAuth.js";
import PostModel from "../../../../DB/models/post.model.js";

export const getTimelinePosts = {
    type: new GraphQLList(postType),
    args: {
        authorization: {type: GraphQLString}
    },
    resolve: async (parent, args) => {
        await isAuthenticatedGraphQL(args.authorization)
        const posts = await PostModel.find({isDeleted: false, status: {$ne: 'only-me'}}).populate([{path: 'comments'}])
        return posts
    }
}

export const getMyPosts = {
    type: new GraphQLList(postType),
    args: {
        authorization: {type: GraphQLString}
    },
    resolve: async (__, args) => {
        const tokenDecode = await isAuthenticatedGraphQL(args.authorization)
        const posts = await PostModel.find({createdBy: tokenDecode.id, isDeleted: false})
        return posts
    }
}

export const getUserPosts = {
    type: new GraphQLList(postType),
    args: {
        authorization: {type: GraphQLString},
        userId: {type: GraphQLID}
    },
    resolve: async (__, args) => {
        await isAuthenticatedGraphQL(args.authorization)
        const posts = await PostModel.find({createdBy: args.userId, isDeleted: false, status: {$ne: 'only-me'}})
        return posts
    }
}