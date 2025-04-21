import { gql } from "@apollo/client";
import { REPOSITORY_LIST, REVIEW_LIST, PAGE_INFO } from "./fragments";

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
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${REPOSITORY_LIST}
  ${PAGE_INFO}
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
  query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryList
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewList
          }
          cursor
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
  ${REPOSITORY_LIST}
  ${REVIEW_LIST}
  ${PAGE_INFO}
`;
