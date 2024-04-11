import { useStore } from "@/store/authToken";
import { useMutation } from "@tanstack/react-query";

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const setAuthToken = useStore((state) => state.setAuthToken);

const loginUser = async ({ username, password }: LoginParams) => {
  const response = await fetch("https://fakestoreapi.com/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      setAuthToken(data.token);
    },
  });
  return mutation;
};