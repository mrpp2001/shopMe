import {
  useQuery,
  QueryFunctionContext,
  useQueryClient,
  MutationFunction,
  useMutation,
} from "@tanstack/react-query";
import { BASE_URL, makeDeleteRequest, makeRequest } from "./baseURL";
import { useStore } from "@/store/store";

const USER_QUERY_KEY = "user";

interface Product {
  id: string;
  data: any;
}

export const useUsers = () => {
  const authToken = useStore((state) => state.authToken);
  const query = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: async (context: QueryFunctionContext) => {
      return makeRequest(BASE_URL + "users/", "GET", authToken, "");
    },
  });

  return {
    ...query,
  };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const authToken = useStore((state) => state.authToken);
  const updateUser: MutationFunction<any, Product> = async ({
    id,
    data,
  }: Product) => {
    return makeRequest(BASE_URL + "users/" + id, "PUT", authToken, data);
  };

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY],
      });
    },
  });

  return mutation;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const authToken = useStore((state) => state.authToken);
  const deleteUser: MutationFunction<any, Product> = async (id) => {
    console.log("USER ID: ", id);
    return makeDeleteRequest(BASE_URL + "users/" + id, authToken);
  };

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY],
      });
    },
  });

  return mutation;
};
