import {
  useQuery,
  QueryFunctionContext,
  useQueryClient,
  MutationFunction,
  useMutation,
} from "@tanstack/react-query";
import { BASE_URL, makeRequest } from "./baseURL";
import { useStore } from "@/store/authToken";

const USER_QUERY_KEY = "user";

interface Product {
  id: string;
  data: any;
}

export const useUsers = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async (context: QueryFunctionContext) => {
      return makeRequest(BASE_URL + "users/", "GET", "");
    },
  });

  return {
    ...query,
  };
};

export const useUpdateUser = () => {
  const updateUser: MutationFunction<any, Product> = async ({
    id,
    data,
  }: Product) => {
    return makeRequest(BASE_URL + "users/" + id, "PUT", "hello", data);
  };

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {},
  });

  return mutation;
};

export const useDeleteUser = () => {
  const deleteUser: MutationFunction<any, Product> = async ({
    id,
  }: Product) => {
    return makeRequest(BASE_URL + "users/" + id, "DELETE");
  };

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {},
  });

  return mutation;
};
