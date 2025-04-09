import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const res = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, refetch } = res;

  const repositories = data && !loading ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;
