import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import theme from "../theme";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import RepositoryList from "./RepositoryList";
import RepositoryItemLoader from "./RepositoryItemLoader";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={<RepositoryList />}
        />
        <Route
          path="/repository/:id"
          element={<RepositoryItemLoader />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </View>
  );
};

export default Main;
