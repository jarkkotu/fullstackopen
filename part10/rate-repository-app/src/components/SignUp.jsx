import { View } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "./Button";
import FormTextInput from "./FormTextInput";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import formStyles from "../styles/formStyles";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required().min(5).max(30),
  password: yup.string().required().min(5).max(50),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={formStyles.container}>
      <FormTextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        error={formik.errors.username}
        touched={formik.touched.username}
      />
      <FormTextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        error={formik.errors.password}
        touched={formik.touched.password}
        secureTextEntry={true}
      />
      <FormTextInput
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        error={formik.errors.passwordConfirmation}
        touched={formik.touched.passwordConfirmation}
        secureTextEntry={true}
      />
      <Button
        onPress={formik.handleSubmit}
        title="Sign up"
      />
    </View>
  );
};

const SignUp = () => {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const signUpData = await signUp({ username, password });
      console.log("signUp", signUpData);
      const signInData = await signIn({ username, password });
      console.log("signIn", signInData);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
