import { Slot, Stack, useRouter, useSegments } from "expo-router";
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
    router.replace("/(public)/home");
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

// const StackLayout =()=>{
//   return(
//     <Stack>
//       <Stack.Screen name="Home" component={RootLayout} />
//     </Stack>
//   )
// }
