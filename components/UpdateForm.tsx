import { useUpdateUser } from "@/api/useUsers";
import { InputField } from "@/components/GenericFormFields";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Button, Text } from "react-native";
import { ToastMessage, showToast } from "./ToastMessage";
import { ConfirmationModal } from "./ConfirmationModal";

// johnd
// m38rmF$

// david_r
// 3478*#54

type Address = {
  city: string;
  number: string;
  street: string;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
};

type FormData = {
  name: {
    firstname: string;
    lastname: string;
  };
  username: string;
  password: string;
  email: string;
  phone: string;
  address: Address;
};

export const UpdateForm = ({ currentUser }: any) => {
  const { mutate: updateUser } = useUpdateUser();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    setValue("name.firstname", currentUser?.name?.firstname);
    setValue("name.lastname", currentUser?.name?.lastname);
    setValue("email", currentUser?.email);
    setValue("phone", currentUser?.phone);
    setValue("username", currentUser?.username);
    setValue("password", currentUser?.password);
  }, []);

  const onSubmit = (data: FormData) => {
    const id = currentUser?.id;

    updateUser(
      { id: id, data: { ...currentUser, ...data } },
      {
        onSuccess: () => {
          setIsConfirmed(false);
          showToast({
            title: "Success",
            message: "User details updated successfully!",
          });
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <ToastMessage />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <InputField
          control={control}
          name="name.firstname"
          placeholder="Enter Name"
          rules={{ required: true }}
          style={{
            width: "48%",
          }}
        />
        {errors?.name?.firstname && (
          <Text style={{ ...styles.errorMessage }}>Firstname is required.</Text>
        )}

        <InputField
          control={control}
          name="name.lastname"
          placeholder="Enter lastname"
          rules={{ required: true }}
          style={{
            width: "48%",
          }}
        />
        {errors?.name?.lastname && (
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
        onPress={() => setIsConfirmed(true)}
        title={"Update Account"}
        color={"#6c47ff"}
      ></Button>

      <ConfirmationModal
        isConfirmed={isConfirmed}
        setIsConfirmed={setIsConfirmed}
        message={
          "Are you sure you want to update this item? Any unsaved changes will be lost."
        }
        ButtonName={"Update"}
        onPress={handleSubmit(onSubmit)}
        style={{ backgroundColor: "green" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
