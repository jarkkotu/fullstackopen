import { View } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "./Button";
import FormTextInput from "./FormTextInput";
import useCreateReview from "../hooks/useCreateReview";
import formStyles from "../styles/formStyles";

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
    <View style={formStyles.container}>
      <FormTextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        error={formik.errors.ownerName}
        touched={formik.touched.ownerName}
      />
      <FormTextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        error={formik.errors.repositoryName}
        touched={formik.touched.repositoryName}
      />
      <FormTextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        error={formik.errors.rating}
        touched={formik.touched.rating}
      />
      <FormTextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        error={formik.errors.text}
        touched={formik.touched.text}
        multiline={true}
      />
      <Button
        onPress={formik.handleSubmit}
        title="Create a review"
      />
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
