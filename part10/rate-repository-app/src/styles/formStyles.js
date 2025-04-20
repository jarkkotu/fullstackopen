import { StyleSheet } from "react-native";
import theme from "./theme";

const formStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    padding: 5,
  },
  textInput: {
    fontColor: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    backgroundColor: theme.colors.textInputBackground,
    borderColor: theme.colors.textInputBorder,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 3,
    textAlign: "left",
  },
  textInputError: {
    borderColor: theme.colors.textInputErrorBorder,
  },
  validationText: {
    color: theme.colors.textInputError,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    textAlign: "left",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default formStyles;
