import { useStore } from "@/store/store";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { BASE_URL, makeRequest } from "./baseURL";

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const setAuthToken = useStore((state) => state.setAuthToken);

export const useLogin = () => {
  const loginUser: MutationFunction<any, LoginParams> = async ({
    username,
    password,
  }) => {
    return makeRequest(BASE_URL + "auth/login/", "POST", "", {
      username,
      password,
    });
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      setAuthToken(data.token);
    },
  });

  return mutation;
};
