import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import TextInput from "./TextInput";
import formStyles from "../styles/formStyles";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

const FormTextInput = ({ value, onChangeText, placeholder, error, touched, secureTextEntry, multiline }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[formStyles.textInput, touched && error && formStyles.textInputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
      {touched && error && <Text style={formStyles.validationText}>{error}</Text>}
    </View>
  );
};

export default FormTextInput;
