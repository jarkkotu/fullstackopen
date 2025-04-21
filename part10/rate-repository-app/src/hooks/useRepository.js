import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id }) => {
  const res = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, error, refetch } = res;

  const repository = data && !loading ? data.repository : undefined;

  return { repository, loading, error, refetch };
};

export default useRepository;
