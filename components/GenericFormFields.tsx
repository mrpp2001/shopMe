import { StyleSheet, TextInput } from "react-native";
import { useController } from "react-hook-form";

export const InputField = ({
  control,
  name,
  rules,
  defaultValue = "",
  style,
  ...props
}: any) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
    rules,
  });

  return (
    <TextInput
      {...props}
      onChangeText={field.onChange}
      value={field.value}
      style={[styles.inputField, style]}
    />
  );
};

const styles = StyleSheet.create({
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
