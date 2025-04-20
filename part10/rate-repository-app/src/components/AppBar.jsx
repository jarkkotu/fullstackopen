import { StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../styles/theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

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
  const { data } = useQuery(ME);

  const isAuthorized = data && data.me;

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
        {isAuthorized && (
          <AppBarTab
            title="Create a review"
            route="/createreview"
          />
        )}
        {isAuthorized ? (
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
        {!isAuthorized && (
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
