import { StyleSheet, View, FlatList } from "react-native";
import useCurrentUser from "../hooks/useCurrentUser";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const MyReviews = () => {
  const { currentUser } = useCurrentUser({ includeReviews: true });
  const reviews = currentUser?.reviews?.edges?.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showButtons={true}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
