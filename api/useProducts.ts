import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFunctionContext,
  MutationFunction,
} from "@tanstack/react-query";
import { BASE_URL, makeRequest } from "./baseURL";
import { useStore } from "@/store/store";

const PRODUCT_LIST_QUERY_KEY = "products";

interface Product {
  id: string;
  data: any;
}

export const useProducts = () => {
  const authToken = useStore((state) => state.authToken);
  const query = useQuery({
    queryKey: [PRODUCT_LIST_QUERY_KEY],
    queryFn: async (context: QueryFunctionContext) => {
      return makeRequest(BASE_URL + "products/", "GET", authToken, "");
    },
  });

  return {
    ...query,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const authToken = useStore((state) => state.authToken);

  const deleteProduct: MutationFunction<any, string> = async (id: string) => {
    return makeRequest(BASE_URL + "products/" + id, "DELETE", authToken, "");
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_LIST_QUERY_KEY] });
    },
  });

  return mutation;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const authToken = useStore((state) => state.authToken);

  const updateProduct: MutationFunction<any, Product> = async ({
    id,
    data,
  }: Product) => {
    return makeRequest(BASE_URL + "products/" + id, "PUT", authToken, data);
  };

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_LIST_QUERY_KEY);
    },
  });

  return mutation;
};
