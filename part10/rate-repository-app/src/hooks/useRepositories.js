import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ first = 10, after = null, orderBy = "CREATED_AT", orderDirection = "DESC" }) => {
  const res = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, error, refetch } = res;

  const repositories = data && !loading ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;
