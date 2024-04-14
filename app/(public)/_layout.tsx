import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useAdmin, useCart, useUser } from "@/store/store";
import { useState } from "react";
import { CartModal } from "@/components/CartModal";

export const LogoutButton = () => {
  const { logout } = useUser();

  return (
    <Pressable
      onPress={() => {
        logout();
        router.replace("/");
      }}
      style={{ marginRight: 10 }}
    >
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

export const ShoppingCart = () => {
  const { items } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setIsCartVisible(true)}
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

      {isCartVisible && (
        <CartModal
          isCartVisible={isCartVisible}
          setIsCartVisible={setIsCartVisible}
        />
      )}
    </>
  );
};

const TabsPage = () => {
  const { isAdmin } = useAdmin();
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
            tabBarLabel: "Home",
            headerRight: () => <ShoppingCart />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: isAdmin ? "Users" : "My Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            tabBarLabel: isAdmin ? "Users" : "My Profile",
            headerRight: () => <LogoutButton />,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsPage;
