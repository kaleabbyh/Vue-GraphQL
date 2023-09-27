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

export const UPDATE_USER = gql`
  mutation UpdateMutation(
    $id: Int!
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    update_user(
      where: { id: { _eq: $id } }
      _set: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      returning {
        email
        firstname
        lastname
        password
      }
    }
  }
`;

export const getUser_Query = gql`
  query getUser {
    user(where: { id: { _eq: 1 } }) {
      email
      firstname
      lastname
      password
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

export const ADD_RECIPE = gql`
  mutation insertRcipe(
    $title: String!
    $description: String!
    $image1: String!
    $image2: String!
    $image3: String!
    $cooking_time: Int!
    $preparation_time: Int!
    $user_id: Int!
    $category_id: Int!
  ) {
    insert_recipe(
      objects: {
        title: $title
        description: $description
        image1: $image1
        image2: $image2
        image3: $image3
        preparation_time: $preparation_time
        cooking_time: $cooking_time
        user_id: $user_id
        category_id: $category_id
      }
    ) {
      returning {
        id
        title
        description
        image1
        image2
        image3
        cooking_time
        preparation_time
        category_id
        user_id
        created_at
        updated_at
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    category {
      image
      id
      name
      updated_at
      created_at
    }
  }
`;
