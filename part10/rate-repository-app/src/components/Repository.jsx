import { useParams } from "react-router-native";
import { StyleSheet, FlatList, View } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Repository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({ id, first: 2 });

  if (loading) {
    return null;
  }

  const reviews = repository?.reviews.edges.map((edge) => edge.node);

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
      onEndReached={() => {
        fetchMore();
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;
