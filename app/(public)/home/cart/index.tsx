import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "..";
import { useCart } from "@/store/authToken";

const cart = () => {
  const { items } = useCart();
  const updateItem = useCart((state) => state.updateItem);
  const removeItem = useCart((state) => state.removeItem);

  return (
    <View
      style={{
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        height: "100%",
        overflow: "scroll",
      }}
    >
      {items?.map((product: any) => {
        const handleAdd = () => {
          const newItem = { ...product, count: product.count + 1 };
          updateItem(product, newItem);
        };

        const handleRemove = () => {
          if (product.count === 1) {
            removeItem(product);
          } else {
            const newItem = { ...product, count: product.count - 1 };
            updateItem(product, newItem);
          }
        };

        const handleDelete = (product: any) => {
          removeItem(product);
        };
        return (
          <Card
            isInCart
            product={product}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            onPress={() => handleDelete(product)}
          />
        );
      })}
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({});
