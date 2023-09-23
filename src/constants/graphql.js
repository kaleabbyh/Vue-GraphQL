import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation InsertUser($name: String!) {
    insert_users_one(object: { name: $name }) {
      name
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
