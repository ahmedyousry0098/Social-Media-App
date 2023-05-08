import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";


export const commentType = new GraphQLObjectType({
    name: 'commentType',
    description: '',
    fields: {
        _id: {type: GraphQLID},
        content: {type: GraphQLString},
        createdBy: {type: GraphQLID},
        createdOn: {type: GraphQLID},
        like: {type: new GraphQLList(GraphQLID)},
        unlike: {type: new GraphQLList(GraphQLID)},
        isDeleted: {type: GraphQLBoolean},
    }
})