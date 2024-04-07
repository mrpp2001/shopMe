import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFunctionContext,
  MutationFunction,
} from "@tanstack/react-query";

const BASE_URL: string = "./baseURL";
const PRODUCT_LIST_QUERY_KEY = "products";

interface Product {
  id: string;
  data: any;
}

export const useProducts = () => {
  const query = useQuery({
    queryKey: [PRODUCT_LIST_QUERY_KEY],
    queryFn: async (context: QueryFunctionContext) => {
      const response = await fetch(BASE_URL + "products/");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  return {
    ...query,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteProduct: MutationFunction<any, string> = async (id: string) => {
    const response = await fetch(BASE_URL + "products/" + id, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_LIST_QUERY_KEY);
    },
  });

  return mutation;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const updateProduct: MutationFunction<any, Product> = async ({
    id,
    data,
  }: Product) => {
    const response = await fetch(BASE_URL + "products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_LIST_QUERY_KEY);
    },
  });

  return mutation;
};
