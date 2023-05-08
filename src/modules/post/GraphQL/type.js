import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { imageType } from '../../GraphQL/shared/type.js'
import { commentType } from '../../comment/GraphQL/type.js'
import CommentModel from '../../../../DB/models/comment.model.js'

export const postType = new GraphQLObjectType({
    name: 'postType',
    description: '',
    fields: {
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        image: {type: imageType },
        createdBy: {type: GraphQLID},
        like: {type: new GraphQLList(GraphQLID)},
        unlike: {type: new GraphQLList(GraphQLID)},
        status: {type: GraphQLString},
        isDeleted: {type: GraphQLBoolean},
        comment: {
            type: new GraphQLList(commentType),
            resolve: async (parent, __) => {
                const comment = await CommentModel.find({createdOn: parent._id})
                return comment
            }
        }
    }
})