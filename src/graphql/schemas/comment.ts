import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    _id: ID!
    body: String!
    post: Post!
    user: User!
  }

  type Query {
    getComments(limit: Int, skip: Int, postId: ID!): [Comment!]!
  }

  type Mutation {
    postCommnet(body: String!, post: String!): Comment
  }
`