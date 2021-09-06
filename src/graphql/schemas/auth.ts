import { gql } from 'apollo-server-express';

export default gql`
  type Login {
    user: User
    token: String
  }

  # union LoginResponse = Login | HTTPRespoonse

  type Query {
    login(email: String!, password: String!): Login
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): Login
  }
`