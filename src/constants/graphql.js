import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation InsertUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    insert_user_one(
      object: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      firstname
      lastname
      email
      password
    }
  }
`;

export const getUser_Query = gql`
  query getUser {
    users(where: { id: { _eq: 1 } }) {
      id
      name
    }
  }
`;

export const USERS_QUERY = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;
