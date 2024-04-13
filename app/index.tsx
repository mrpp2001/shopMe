import { useLogin } from "@/api/useLogin";
import { InputField } from "@/components/GenericFormFields";
import { useAdmin, useUser } from "@/store/authToken";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text } from "react-native";

// david_r
// 3478*#54

type LoginData = {
  username: string;
  password: string;
};

const index = ({ isNewUser, setIsNewUser }: any) => {
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
      },
    });
    console.log("FORM DATA: ", data);
  };

  return (
    <View style={styles.container}>
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
