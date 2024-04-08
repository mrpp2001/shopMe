import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useProducts } from "@/api/useProducts";
import { AirbnbRating, Rating } from "react-native-ratings";

const Home = () => {
  const { data: ProductList } = useProducts();
  console.log("PRODUCT DATA: ", ProductList);

  return (
    <View
      style={{
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 5,
      }}
    >
      {ProductList?.map((product: any) => (
        <Card product={product} />
      ))}
    </View>
  );
};

const Card = ({ product }: any) => {
  return (
    <View
      key={product?.id}
      style={{
        padding: 10,
        backgroundColor: "lightgray",
        borderRadius: 15,
        justifyContent: "space-between",
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
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
