import { useLogin } from "@/api/useLogin";
import { InputField } from "@/components/GenericFormFields";
import { ToastMessage, showToast } from "@/components/ToastMessage";
import { useAdmin, useUser } from "@/store/store";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text } from "react-native";

type LoginData = {
  username: string;
  password: string;
};

const index = () => {
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

    userLogin(data, {
      onSuccess: () => {
        login(username);
        router.replace("/(public)/home");
        showToast({
          title: "Success",
          message: "You have successfully logged in 👋",
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <ToastMessage />
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "700",
          fontSize: 20,
          marginVertical: 10,
        }}
      >
        Login to ShopMe :)
      </Text>

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

export default index;
