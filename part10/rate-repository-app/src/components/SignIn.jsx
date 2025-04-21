import { View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "./Button";
import FormTextInput from "./FormTextInput";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import formStyles from "../styles/formStyles";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required().min(1),
  password: yup.string().required().min(1),
});

export const SignInForm = ({ onSubmit }) => {
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
      <Button
        onPress={formik.handleSubmit}
        title="Sign in"
      />
    </View>
  );
};

const SignIn = () => {
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log("signIn", data);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
