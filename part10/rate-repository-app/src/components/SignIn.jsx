import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    padding: 5,
  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.textInputBackground,
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

  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required().min(1),
  password: yup.string().required().min(1),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.textInput, formik.touched.username && formik.errors.username && styles.textInputError]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.validationText}>{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.textInput, formik.touched.password && formik.errors.password && styles.textInputError]}
          secureTextEntry={true}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.validationText}>{formik.errors.password}</Text>
        )}
      </View>
      <View style={styles.innerContainer}>
        <Pressable
          style={styles.button}
          onPress={formik.handleSubmit}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
