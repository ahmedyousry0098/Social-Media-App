import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import UserModel from '../../../DB/models/user.model.js'
import { getAllUsers, getUserProfile } from '../profile/GraphQL/fields.js'

export const rootSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        description: '',
        fields: {
            userProfile: getUserProfile,
            users: getAllUsers
        }
    })
})