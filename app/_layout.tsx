import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const InitialLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(public)/home");
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
