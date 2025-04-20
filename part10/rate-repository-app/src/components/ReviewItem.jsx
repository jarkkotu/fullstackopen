import { StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../styles/theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container0: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  container1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 5,
    marginRight: 55,
  },
  ratingContainer: {
    backgroundColor: "white",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: 20,
    textAlign: "center",
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container0}>
      <View style={styles.ratingContainer}>
        <Text
          fontSize="heading"
          fontWeight="bold"
          style={styles.ratingText}
        >
          {review.rating}
        </Text>
      </View>
      <View style={styles.container1}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ marginBottom: 5 }}
        >
          {review.user.username}
        </Text>
        <Text
          color="textSecondary"
          style={{ marginBottom: 5 }}
        >
          {format(review.createdAt, "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
