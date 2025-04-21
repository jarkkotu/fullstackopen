import { gql } from "@apollo/client";
import { REPOSITORY_LIST, REVIEW_LIST } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryList
        }
      }
    }
  }
  ${REPOSITORY_LIST}
`;

export const CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewList
          }
        }
      }
    }
  }
  ${REVIEW_LIST}
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      ...RepositoryList
      url
      reviews {
        edges {
          node {
            ...ReviewList
          }
        }
      }
    }
  }
  ${(REPOSITORY_LIST, REVIEW_LIST)}
`;
