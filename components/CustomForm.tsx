import { useLogin } from "@/api/useLogin";
import { InputField } from "@/components/GenericFormFields";
import { useAdmin } from "@/store/authToken";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text, Pressable } from "react-native";

type FormData = {
  username: string;
  password: string;
};

export const CustomForm = ({ isNewUser, setIsNewUser }: any) => {
  const { mutate: userLogin } = useLogin();
  const { validateUser } = useAdmin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { username, password } = data;

    validateUser(username, password);

    userLogin(data, {
      onSuccess: () => {
        router.replace("/(public)/home");
      },
    });
    console.log("FORM DATA: ", data);
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
        title={isNewUser ? "Login" : "Create Account"}
        color={"#6c47ff"}
      ></Button>

      {/* <Pressable
        style={styles.button}
        onPress={() => setIsNewUser((prev: boolean) => !prev)}
      >
        <Text style={{ fontWeight: "600" }}>
          {isNewUser ? "Create Account" : "Login"}
        </Text>
      </Pressable> */}
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
