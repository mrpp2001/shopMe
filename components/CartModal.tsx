import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useCart } from "@/store/authToken";
import { Ionicons } from "@expo/vector-icons";

export const CartModal = ({ isVisible }) => {
  const { items } = useCart();
  const updateItem = useCart((state) => state.updateItem);
  const removeItem = useCart((state) => state.removeItem);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          padding: 10,
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
            <>
              <CartCard
                product={product}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                handleDelete={() => handleDelete(product)}
              />
            </>
          );
        })}
      </View>
    </Modal>
  );
};

const CartCard = ({ product, handleAdd, handleRemove, handleDelete }: any) => {
  return (
    <View
      key={product?.id}
      style={{
        padding: 10,
        backgroundColor: "#F9F9F9",
        borderRadius: 15,
      }}
    >
      <View
        style={{
          gap: 10,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 50, height: 80, borderRadius: 15 }}
          source={{ uri: product?.image }}
        />

        <View style={{ gap: 5, width: "80%" }}>
          <Text style={{ fontWeight: "600", fontSize: 14, width: "auto" }}>
            {product?.title}
          </Text>
        </View>
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "40%",
          }}
        >
          <TouchableOpacity onPress={handleRemove}>
            <Ionicons name="remove-circle-outline" size={35} color={"gray"} />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {product?.count}
          </Text>

          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="add-circle-outline" size={35} color={"gray"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash-outline" size={35} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
