import { gql } from "@apollo/client";
import { REPOSITORY_LIST } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
