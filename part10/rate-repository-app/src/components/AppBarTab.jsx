import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: theme.colors.appBarBackground,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pressable: {
    backgroundColor: "transparent",
  },
  pressablePressed: {
    backgroundColor: "#3a3f44",
  },
});

const AppBarTab = ({ title, route }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => console.log(`${title} pressed`)}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}
      >
        <Link to={route}>
          <Text style={styles.text}>{title}</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
