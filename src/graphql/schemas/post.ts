import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    _id: ID
    title: String
    subtitle: String
    body: String
    banner: String
    comments: [Comment]
    user: User
  }

  type Query {
    posts(limit: Int, skip: Int): [Post!]!
    post(id: ID): Post
  }

  type Mutation {
    createPost(title: String!, subtitle: String, body: String!, banner: String): Post!
  }
`