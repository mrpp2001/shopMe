import { useLogin } from "@/api/useLogin";
import { InputField } from "@/components/GenericFormFields";
import { useAdmin, useUser } from "@/store/authToken";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// johnd
// m38rmF$

// david_r
// 3478*#54

type LoginData = {
  username: string;
  password: string;
};

export const CustomForm = () => {
  const { mutate: LogUser } = useLogin();
  const { validateUser, isAdmin } = useAdmin();
  const { login } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  // Set function
  const storeData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  // Get function
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getAdmin = async () => {
    const isAdmin = await getData("isAdmin");
    console.log("GET ADMIN: ", isAdmin);
  };

  const getLoged = async () => {
    const isLoged = await getData("isLoged");
    console.log("GET LOGED: ", isLoged);
  };

  const onSubmit = async (data: LoginData) => {
    const { username, password } = data;

    validateUser(username, password);
    login(username);

    LogUser(data, {
      onSuccess: async () => {
        router.replace("/(public)/home");
        await storeData("isAdmin", isAdmin);
        await storeData("isLoged", true);
      },
    });

    console.log("FORM DATA: ", username);
    await getAdmin();
    await getLoged();
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
