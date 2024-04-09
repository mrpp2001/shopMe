import { CustomForm } from "@/components/CustomForm";
import { useState } from "react";
import { View } from "react-native";

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(true);

  fetch("https://fakestoreapi.com/users/1")
    .then((res) => res.json())
    .then((json) => console.log(json));

  return (
    <View>
      <CustomForm isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
    </View>
  );
};

export default Login;
