import {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList} from 'graphql'

const imgType = new GraphQLObjectType({
    name: 'imgType',
    fields: {
        public_id: {type: GraphQLString},
        secure_url: {type: GraphQLString}
    }
})
export const userType = new GraphQLObjectType({
    name: 'profileType',
    description: '',
    fields: {
        _id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        profilePic: {type: imgType},
        profileCover: {type: imgType},
        role: {type: GraphQLString},
        createdBy: {type: GraphQLID},
        verificationCode: {type: GraphQLString},
        isConfirmed: {type: GraphQLBoolean},
        isLoggedIn: {type: GraphQLBoolean},
        isDeleted: {type: GraphQLBoolean},
    }
})
