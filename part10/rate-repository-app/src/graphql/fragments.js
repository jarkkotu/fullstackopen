import { gql } from "@apollo/client";

export const REPOSITORY_LIST = gql`
  fragment RepositoryList on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const REVIEW_LIST = gql`
  fragment ReviewList on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
