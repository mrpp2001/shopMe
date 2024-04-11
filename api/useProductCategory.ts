import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { BASE_URL, makeRequest } from "./baseURL";

interface Category {
  category: string;
}

export const useGetAllCategories = () => {
  const query = useQuery({
    queryKey: ["category"],
    queryFn: async (context: QueryFunctionContext) => {
      return makeRequest(BASE_URL + "products/categories/", "GET", "");
    },
  });

  return {
    ...query,
  };
};

export const useSpecificCategory = ({ category }: Category) => {
  const query = useQuery({
    queryKey: [category],
    queryFn: async () => {
      return makeRequest(BASE_URL + `products/category/${category}`, "GET", "");
    },
  });

  return {
    ...query,
  };
};
