import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { BASE_URL, makeRequest } from "./baseURL";
import { useStore } from "@/store/authToken";

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
