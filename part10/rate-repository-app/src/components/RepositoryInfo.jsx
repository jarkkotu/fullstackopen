import { View, StyleSheet, Image, Linking } from "react-native";
import Text from "./Text";
import Button from "./Button";
import theme from "../theme";

const styles = StyleSheet.create({
  container0: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "white",
  },
  container1: {
    display: "flex",
    flexDirection: "row",
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
  },
  container3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
  container4: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
  },
  numberContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  language: {
    fontWeight: "normal",
    color: "#ffffff",
    fontSize: 14,
    backgroundColor: theme.colors.primary,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});

export const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number.toString();
};

export const NumberContainer = ({ title, number }) => {
  return (
    <View style={styles.numberContainer}>
      <Text fontWeight="bold">{formatNumber(number)}</Text>
      <Text color="textSecondary">{title}</Text>
    </View>
  );
};

const RepositoryInfo = ({ repository, showUrl }) => {
  return (
    <View
      testID="repositoryItem"
      style={styles.container0}
    >
      <View style={styles.container1}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.container2}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ marginBottom: 5 }}
          >
            {repository.fullName}
          </Text>
          <Text
            color="textSecondary"
            style={{ marginBottom: 5 }}
          >
            {repository.description}
          </Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.container3}>
        <NumberContainer
          title="Stars"
          number={repository.stargazersCount}
        />
        <NumberContainer
          title="Forks"
          number={repository.forksCount}
        />
        <NumberContainer
          title="Reviews"
          number={repository.reviewCount}
        />
        <NumberContainer
          title="Rating"
          number={repository.ratingAverage}
        />
      </View>
      {showUrl && (
        <View style={styles.container4}>
          <Button
            onPress={() => Linking.openURL(repository.url)}
            title="Open in GitHub"
          />
        </View>
      )}
    </View>
  );
};
export default RepositoryInfo;
