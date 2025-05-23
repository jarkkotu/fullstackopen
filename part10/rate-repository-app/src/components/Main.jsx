import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import theme from "../styles/theme";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RepositoryList from "./RepositoryList";
import Repository from "./Repository";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";

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
          element={<Repository />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/createreview"
          element={<CreateReview />}
        />
        <Route
          path="/myreviews"
          element={<MyReviews />}
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
