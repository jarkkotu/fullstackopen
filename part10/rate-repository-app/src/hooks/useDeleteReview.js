import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const useDeleteReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const deleteReview = async ({ id }) => {
    await mutate({ variables: { id } });
    await apolloClient.resetStore();
  };
  return { deleteReview, result };
};

export default useDeleteReview;
