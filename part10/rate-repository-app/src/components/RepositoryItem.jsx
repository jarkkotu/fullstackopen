import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  rowContainer: {
    flexDirection: "row",
  },
  label: {
    marginRight: 5,
  },
  text: {},
});

const RepositoryItem = ({ repository }) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount } = repository;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Full name:</Text>
        <Text style={styles.text}>{fullName}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Language</Text>
        <Text style={styles.text}>{language}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Start</Text>
        <Text style={styles.text}>{stargazersCount}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Forks count</Text>
        <Text style={styles.text}>{forksCount}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Reviews</Text>
        <Text style={styles.text}>{reviewCount}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Rating</Text>
        <Text style={styles.text}>{ratingAverage}</Text>
      </View>
    </View>
  );
};
export default RepositoryItem;
