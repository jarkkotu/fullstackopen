import { StyleSheet, Pressable, Text } from "react-native";

const styles = StyleSheet.create({
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

const AppBarTab = ({ title }) => {
  return (
    <Pressable
      onPress={() => console.log(`${title} pressed`)}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
