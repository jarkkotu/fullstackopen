import { StyleSheet, View } from "react-native";
import { json, useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import TextInput from "./TextInput";
import Button from "./Button";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required().min(1),
  repositoryName: yup.string().required().min(1),
  rating: yup.number().integer().required().min(0).max(100),
  text: yup.string().optional(),
});

const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.textInput, formik.touched.ownerName && formik.errors.ownerName && styles.textInputError]}
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={styles.validationText}>{formik.errors.ownerName}</Text>
        )}
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.repositoryName && formik.errors.repositoryName && styles.textInputError,
          ]}
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={styles.validationText}>{formik.errors.repositoryName}</Text>
        )}
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.textInput, formik.touched.rating && formik.errors.rating && styles.textInputError]}
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={styles.validationText}>{formik.errors.rating}</Text>
        )}
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.textInput, formik.touched.text && formik.errors.text && styles.textInputError]}
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange("text")}
          multiline={true}
        />
        {formik.touched.text && formik.errors.text && <Text style={styles.validationText}>{formik.errors.text}</Text>}
      </View>
      <View style={styles.innerContainer}>
        <Button
          onPress={formik.handleSubmit}
          title="Create a review"
        />
      </View>
    </View>
  );
};

const CreateReview = () => {
  const { createReview } = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    console.log("Submitting review:", { ownerName, repositoryName, rating, text });

    try {
      const data = await createReview({ ownerName, repositoryName, rating: parseInt(rating), text });
      console.log("Review created:", data);
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      } else {
        console.error("No repository ID returned from createReview");
      }
    } catch (e) {
      console.error("Error creating review:", e);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
