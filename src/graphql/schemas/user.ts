import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    users: [User!]!
  }
`