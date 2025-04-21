import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../styles/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.buttonPrimary,
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },

  buttonText: {
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const Button = ({ onPress, title, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default Button;
