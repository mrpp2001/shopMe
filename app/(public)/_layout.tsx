import { Stack, Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export const LogoutButton = () => {
  return (
    <Pressable
      onPress={() => router.replace("/login")}
      style={{ marginRight: 10 }}
    >
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

export const ShoppingCart = () => {
  return (
    <Pressable onPress={() => router.push("/cart")} style={{ marginRight: 10 }}>
      <Ionicons name="cart-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6c47ff",
          },
          headerTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerTitle: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            tabBarLabel: "My Profile",
            headerRight: () => <ShoppingCart />,
          }}
          // redirect={!isSignedIn}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: "My Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            tabBarLabel: "My Profile",
            headerRight: () => <LogoutButton />,
          }}
          // redirect={!isSignedIn}
        />
      </Tabs>

      
    </>
  );
};

export default TabsPage;
