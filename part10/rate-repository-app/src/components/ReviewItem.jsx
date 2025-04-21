import { StyleSheet, View, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../styles/theme";
import { format } from "date-fns";
import Text from "./Text";
import Button from "./Button";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "white",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  textsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 0,
    flexShrink: 1,
    flexWrap: "wrap",
    width: "100%",
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: theme.colors.buttonPrimary,
  },
  deleteButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: theme.colors.buttonDelete,
  },
});

const ReviewItem = ({ review, showButtons = false }) => {
  const navigate = useNavigate();
  const { deleteReview } = useDeleteReview();

  const handleViewRepository = () => {
    navigate(`/repository/${review.repositoryId}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              console.log(`Deleting review: ${review.id}`);
              await deleteReview({ id: review.id });
            } catch (error) {
              console.error(`Error deleting review:${review?.id}`, error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.ratingContainer}>
          <Text
            fontSize="heading"
            fontWeight="bold"
            style={styles.ratingText}
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.textsContainer}>
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
      {showButtons && (
        <View style={styles.buttonsContainer}>
          <Button
            title="View repository"
            onPress={handleViewRepository}
            style={styles.button}
          />
          <Button
            title="Delete review"
            onPress={handleDeleteReview}
            style={styles.deleteButton}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
