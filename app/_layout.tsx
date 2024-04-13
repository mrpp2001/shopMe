import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// johnd
// m38rmF$

// david_r
// 3478*#54

const InitialLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return <Slot />;
};

const RootLayout = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <InitialLayout />
    </QueryClientProvider>
  );
};

export default RootLayout;
