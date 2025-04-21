import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (props) => {
  const includeReviews = props?.includeReviews || false;

  const res = useQuery(CURRENT_USER, {
    variables: {
      includeReviews,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, error, refetch } = res;

  const me = data && !loading ? data.me : undefined;

  return { currentUser: me, loading, refetch };
};

export default useCurrentUser;
