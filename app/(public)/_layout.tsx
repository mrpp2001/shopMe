import { Stack, Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useCart } from "@/store/authToken";

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
  const { items } = useCart();
  return (
    <Pressable
      onPress={() => router.push("/(public)/home/cart/")}
      style={{ marginRight: 10, position: "relative" }}
    >
      <Ionicons name="cart-outline" size={24} color={"#fff"} />
      <Text
        style={{
          position: "absolute",
          backgroundColor: "red",
          color: "white",
          fontWeight: "600",
          padding: 3,
          paddingHorizontal: 6,
          top: -8,
          right: -8,
          fontSize: 10,
          borderRadius: 25,
        }}
      >
        {items?.length}
      </Text>
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
        />
      </Tabs>
    </>
  );
};

export default TabsPage;
