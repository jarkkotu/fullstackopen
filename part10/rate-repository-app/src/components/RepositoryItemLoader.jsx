import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-native";
import { Text } from "react-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

const RepositoryItemLoader = () => {
  const location = useLocation();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: location.state.repository.id },
    skip: !location.state,
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return null;
  }
  const repositoryListData = location.state ? location.state.repository : null;
  if (!repositoryListData) {
    return <Text>No repository found</Text>;
  }

  const repository = data && !loading ? data.repository : null;

  const fullRepository = {
    ...repositoryListData,
    ...repository,
  };
  return (
    <RepositoryItem
      repository={fullRepository}
      showUrl={true}
    />
  );
};

export default RepositoryItemLoader;
