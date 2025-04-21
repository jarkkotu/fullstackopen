import { gql } from "@apollo/client";
import { REPOSITORY_LIST, REVIEW_LIST } from "./fragments";

export const GET_REPOSITORIES = gql`
  query ($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryList
        }
      }
    }
  }
  ${REPOSITORY_LIST}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
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
