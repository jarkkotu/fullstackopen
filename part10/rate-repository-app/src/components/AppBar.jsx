import { StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../styles/theme";
import AppBarTab from "./AppBarTab";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import useCurrentUser from "../hooks/useCurrentUser";

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { currentUser } = useCurrentUser();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        <AppBarTab
          title="Repositories"
          route="/"
        />
        {currentUser && (
          <AppBarTab
            title="Create a review"
            route="/createreview"
          />
        )}
        {currentUser && (
          <AppBarTab
            title="My reviews"
            route="/myreviews"
          />
        )}
        {currentUser ? (
          <AppBarTab
            title="Sign out"
            onPress={handleSignOut}
          />
        ) : (
          <AppBarTab
            title="Sign in"
            route="/signin"
          />
        )}
        {!currentUser && (
          <AppBarTab
            title="Sign up"
            route="/signup"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
