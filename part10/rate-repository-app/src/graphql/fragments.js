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
