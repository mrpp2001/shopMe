import { ErrorMessage } from "@/app/(public)/home";
import { useCart } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const ProductCard = ({ product, onPress }: any) => {
  return (
    <View
      key={product?.id}
      style={{
        padding: 10,
        backgroundColor: "#F9F9F9",
        borderRadius: 15,
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <View style={{ gap: 10, width: 150, justifyContent: "space-between" }}>
        <Image
          style={{ width: "100%", height: 220, borderRadius: 15 }}
          source={{ uri: product?.image }}
        />

        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {product?.title}
          </Text>
          <Text style={{ fontSize: 12 }} numberOfLines={3} ellipsizeMode="tail">
            {product?.description}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            alignSelf: "flex-end",
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 25,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          Rs {product?.price}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#6C47FF",
            alignItems: "center",
            padding: 8,
            borderRadius: 25,
          }}
          onPress={onPress}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SmallCartProductCard = () => {
  const { items, removeItem } = useCart();

  const handleRemove = (product: any) => {
    removeItem(product);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        gap: 15,
        width: "95%",
        overflow: "scroll",
      }}
    >
      {items?.length <= 0 && (
        <ErrorMessage
          message="Your cart is empty. Please drag product"
          style={{ color: "black", fontSize: 16, margin: 25, marginTop: 38 }}
        />
      )}

      {items?.map((product: any) => {
        return (
          <View
            key={product?.id}
            style={{
              padding: 5,
              position: "relative",
              marginVertical: 15,
              marginTop: 38,
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -16,
                right: -16,
              }}
              onPress={() => handleRemove(product)}
            >
              <Ionicons name="close-circle-outline" size={30} color={"red"} />
            </TouchableOpacity>

            <Image
              style={{ width: 40, height: 50, borderRadius: 15 }}
              source={{ uri: product?.image }}
            />
          </View>
        );
      })}
    </View>
  );
};
