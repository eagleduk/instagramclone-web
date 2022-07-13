import { gql } from "@apollo/client";

export const viewPhotoFragment = gql`
  fragment viewPhoto on Photo {
    like
    isLike
  }
`;

export const createComment = gql`
  fragment createComment on Comment {
    id
    text
    userId
    photoId
  }
`;
