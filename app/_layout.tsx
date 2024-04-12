import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const InitialLayout = () => {
  const segments = useSegments();
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

// const StackLayout =()=>{
//   return(
//     <Stack>
//       <Stack.Screen name="Home" component={RootLayout} />
//     </Stack>
//   )
// }
