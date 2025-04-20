import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { StyleSheet, FlatList, View } from "react-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Repository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return null;
  }
  const repository = data && !loading ? data.repository : null;

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <ReviewItem review={item}></ReviewItem>}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryInfo
          repository={repository}
          showUrl={true}
        />
      )}
    ></FlatList>
  );
};

export default Repository;
