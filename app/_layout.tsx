import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const InitialLayout = () => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // const inTabsGroup = segments[0] === "(auth)";

    // if (!inTabsGroup) {
    // router.replace("/home");
    // } else {
    router.replace("/login");
    // }
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
