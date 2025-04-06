import { StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        <AppBarTab
          title="SignIn"
          route="/signin"
        />
        <AppBarTab
          title="Repositories"
          route="/"
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
