import { gql } from "@apollo/client";

export const FEEDSQUERY = gql`
  query ViewFeeds {
    viewFeeds {
      id
      createdAt
      caption
      file
      user {
        username
        id
        avator
      }
      isOwner
      like
      comments {
        id
        text
        userId
        photoId
        user {
          username
          id
          avator
        }
      }
      isLike
    }
  }
`;

export const TOKENUSER = gql`
  query GetTokenUser {
    getTokenUser {
      id
      avator
      username
      firstname
      lastname
      email
    }
  }
`;

export const GETUSER = gql`
  query GetUserProfile($username: String!) {
    getUserProfile(username: $username) {
      id
      followerCount
      followingCount
      isOwner
      bio
      avator
      username
      isFollowing
      isFollower
      photo {
        id
        file
        comments {
          id
        }
        like
      }
    }
  }
`;
