import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_UP);
  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    await apolloClient.resetStore();
    return data;
  };
  return { signUp, result };
};

export default useSignUp;
