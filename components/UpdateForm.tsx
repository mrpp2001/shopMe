import { useLogin } from "@/api/useLogin";
import { useUsers } from "@/api/useUsers";
import { InputField } from "@/components/GenericFormFields";
import { useAdmin, useUser } from "@/store/authToken";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text } from "react-native";

// david_r
// 3478*#54

type FormData = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export const UpdateForm = ({ currentUser }: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    setValue("firstname", currentUser[0]?.name?.firstname);
    setValue("lastname", currentUser[0]?.name?.lastname);
    setValue("email", currentUser[0]?.email);
    setValue("phone", currentUser[0]?.phone);
    setValue("username", currentUser[0]?.username);
    setValue("password", currentUser[0]?.password);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <InputField
          control={control}
          name="firstname"
          placeholder="Enter Name"
          rules={{ required: true }}
          style={{
            width: "48%",
          }}
        />
        {errors.firstname && (
          <Text style={{ ...styles.errorMessage }}>Firstname is required.</Text>
        )}

        <InputField
          control={control}
          name="lastname"
          placeholder="Enter lastname"
          rules={{ required: true }}
          style={{
            width: "48%",
          }}
        />
        {errors.lastname && (
          <Text style={{ ...styles.errorMessage }}>Lastname is required.</Text>
        )}
      </View>

      <View>
        <InputField
          control={control}
          name="email"
          placeholder="Enter Email"
          rules={{ required: true }}
        />
        {errors.email && (
          <Text style={{ ...styles.errorMessage }}>Email is required.</Text>
        )}
      </View>

      <View>
        <InputField
          control={control}
          name="phone"
          placeholder="Enter phone"
          rules={{ required: true }}
        />
        {errors.phone && (
          <Text style={{ ...styles.errorMessage }}>Phone is required.</Text>
        )}
      </View>

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
        // onPress={handleSubmit(onSubmit)}
        title={"Update Account"}
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
