import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { getAllUsers, getUserProfile } from '../profile/GraphQL/fields.js'
import { getMyPosts, getTimelinePosts, getUserPosts } from '../post/GraphQL/field.js'

export const rootSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        description: '',
        fields: {
            userProfile: getUserProfile,
            users: getAllUsers,
            posts: getTimelinePosts,
            myPosts: getMyPosts,
            userPosts: getUserPosts
        }
    })
})