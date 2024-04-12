import { useLogin } from "@/api/useLogin";
import { InputField } from "@/components/GenericFormFields";
import { useAdmin, useUser } from "@/store/authToken";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text } from "react-native";

// johnd
// m38rmF$

// david_r
// 3478*#54

type LoginData = {
  username: string;
  password: string;
};

export const CustomForm = () => {
  const { mutate: userLogin } = useLogin();
  const { validateUser } = useAdmin();
  const { login } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    const { username, password } = data;

    validateUser(username, password);
    login(username);

    userLogin(data, {
      onSuccess: () => {
        router.replace("/(public)/home");
      },
    });
    console.log("FORM DATA: ", username);
  };

  return (
    <View style={styles.container}>
      <InputField
        control={control}
        name="username"
        placeholder="Enter username"
        rules={{ required: true }}
      />
      {errors.username && (
        <Text style={{ ...styles.errorMessage }}>Username is required.</Text>
      )}

      <InputField
        control={control}
        name="password"
        placeholder="Enter Password"
        secureTextEntry
        rules={{ required: true }}
      />
      {errors.password && (
        <Text style={{ ...styles.errorMessage }}>Password is required.</Text>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        title={"Login"}
        color={"#6c47ff"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 3,
  },

  button: {
    margin: 8,
    alignItems: "center",
  },

  errorMessage: {
    alignSelf: "flex-end",
    color: "red",
  },
});
