import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-native";
import { StyleSheet, FlatList, View } from "react-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Repository = () => {
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

  const reviews = fullRepository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <ReviewItem review={item}></ReviewItem>}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryInfo
          repository={fullRepository}
          showUrl={true}
        />
      )}
    ></FlatList>
  );
};

export default Repository;
