import { Platform } from "react-native";

const theme = {
  colors: {
    mainBackground: "#e1e4e8",
    appBarBackground: "#24292e",

    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    textInputBorder: "#e1e4e8",
    textInputBackground: "#ffffff",
    textInputError: "#d73a4a",
    textInputErrorBorder: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
