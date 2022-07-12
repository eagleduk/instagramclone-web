import { gql } from "@apollo/client";

export const viewPhotoFragment = gql`
  fragment viewPhoto on Photo {
    like
    isLike
  }
`;
