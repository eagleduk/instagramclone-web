import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      message
      result
    }
  }
`;

export const CREATEUSER = gql`
  mutation CreateUser(
    $firstname: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      firstname: $firstname
      username: $username
      password: $password
      email: $email
    ) {
      id
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation ToggleLike($id: Int!) {
    toggleLike(id: $id) {
      message
      result
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      result
      message
    }
  }
`;
