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
    repositoryId
    user {
      id
      username
    }
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    endCursor
    startCursor
    hasNextPage
    hasPreviousPage
  }
`;
