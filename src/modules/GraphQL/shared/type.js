import { GraphQLObjectType, GraphQLString } from "graphql";

export const imageType = new GraphQLObjectType({
    name: 'imageType',
    description: '',
    fields: {
        public_id: {type: GraphQLString},
        secure_url: {type: GraphQLString}
    }
})