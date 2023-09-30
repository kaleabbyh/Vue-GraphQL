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
      id
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
  query getUser($id: Int!) {
    user(where: { id: { _eq: $id } }) {
      id
      email
      firstname
      lastname
      password
      created_at
      updated_at
      recipes {
        id
        title
        description
        created_at
        cooking_time
        category_id
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($email: String!, $password: String!) {
    user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      email
      firstname
      lastname
      password
      created_at
      updated_at
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

export const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $id: Int!
    $title: String!
    $description: String!
    $image1: String!
    $image2: String!
    $image3: String!
    $cooking_time: Int!
    $preparation_time: Int!
    $category_id: Int!
  ) {
    update_recipe(
      where: { id: { _eq: $id } }
      _set: {
        title: $title
        description: $description
        image1: $image1
        image2: $image2
        image3: $image3
        preparation_time: $preparation_time
        cooking_time: $cooking_time
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

export const GET_RECIPES = gql`
  query getRecipes {
    recipe {
      id
      title
      description
      image1
      image2
      image3
      preparation_time
      cooking_time
      user_id
      category_id
      created_at
      updated_at
      category {
        name
        id
      }
      ingredients {
        id
        name
        amount
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($id: Int) {
    recipe(where: { id: { _eq: $id } }) {
      id
      title
      description
      image1
      image2
      image3
      preparation_time
      cooking_time
      user_id
      category_id
      created_at
      updated_at
      ingredients {
        amount
        name
        id
        recipe_id
      }

      steps {
        id
        description
        recipe_id
        step_number
      }
      category {
        image
        name
        id
      }
    }
  }
`;

export const SEARCH_RECIPE_BY_CATEGORY = gql`
  query GetRecipesByCategory($category_name: String!) {
    category(where: { name: { _ilike: $category_name } }) {
      id
      recipes {
        id
        title
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

export const ADD_INGREDIENT = gql`
  mutation addIngredient($name: String!, $amount: String!, $recipe_id: Int!) {
    insert_ingredient(
      objects: { amount: $amount, name: $name, recipe_id: $recipe_id }
    ) {
      returning {
        id
        name
        amount
        recipe_id
      }
    }
  }
`;

export const ADD_STEP = gql`
  mutation addStep(
    $step_number: Int!
    $description: String!
    $recipe_id: Int!
  ) {
    insert_step(
      objects: {
        step_number: $step_number
        description: $description
        recipe_id: $recipe_id
      }
    ) {
      returning {
        id
        description
        step_number
        recipe_id
      }
    }
  }
`;
