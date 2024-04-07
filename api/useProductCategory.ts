import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

const BASE_URL: string = "./baseURL";

export const useGetAllCategories = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async (context: QueryFunctionContext) => {
      const response = await fetch(BASE_URL + "products/categories/");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  return {
    ...query,
  };
};

interface Category {
  category: string;
}

export const useSpecificCategory = ({ category }: Category) => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async (context: QueryFunctionContext) => {
      const response = await fetch(BASE_URL + `products/category/${category}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  return {
    ...query,
  };
};
