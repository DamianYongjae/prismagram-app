import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    commentCount
    isLiked
    comments {
      id
      text
      user {
        id
        avatar
        username
      }
    }
    createdAt
  }
`;
