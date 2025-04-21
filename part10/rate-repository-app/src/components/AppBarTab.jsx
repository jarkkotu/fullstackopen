import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import theme from "../styles/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: theme.colors.appBarBackground,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressable: {
    backgroundColor: "transparent",
  },
  pressablePressed: {
    backgroundColor: "#3a3f44",
  },
});

const AppBarTab = ({ title, route, onPress }) => {
  const handlePress = async () => {
    console.log(`${title} pressed`);
    if (onPress) {
      await onPress();
    }
  };

  const isLink = Boolean(route);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}
      >
        {isLink ? (
          <Link to={route}>
            <Text style={styles.text}>{title}</Text>
          </Link>
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default AppBarTab;
