import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useProducts } from "@/api/useProducts";
import { useCart } from "@/store/authToken";
import { Ionicons } from "@expo/vector-icons";
import {
  useGetAllCategories,
  useSpecificCategory,
} from "@/api/useProductCategory";
import { DraggableItem } from "@/components/DraggableItem";
import SmallCart from "@/components/SmallCart";
import { ProductCard, SmallCartProductCard } from "@/components/ProductCard";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    data: productList,
    isPending: isPendingProductList,
    isError: isErrorProductList,
  } = useProducts();

  const {
    data: categoryList,
    isPending: isPendingCategoryList,
    isError: isErrorCategoryList,
  } = useGetAllCategories();

  const {
    data: selectedCategoryProductList,
    isPending: isPendingSelectedCategoryProductList,
    isError: isErrorSelectedCategoryProductList,
  } = useSpecificCategory({
    category: selectedCategory,
  });

  const { addItem } = useCart();
  const [isSorted, setIsSorted] = useState(false);

  const handleAddItem = (product: any) => {
    addItem(product);
  };

  const sortedProductList = isSorted
    ? [...productList].sort((a, b) => a.title.localeCompare(b.title))
    : productList;

  const displayProductList = selectedCategory
    ? selectedCategoryProductList
    : sortedProductList;

  const handleCategorySelect = (category: any) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  // Drag Product
  const screenHeight = Dimensions.get("window").height; // Use Dimensions API for React Native
  const cartHeight = 0.25 * screenHeight; // Cart height is 25% of the screen height
  const cartPosition = {
    x: 50,
    y: screenHeight - cartHeight, // Position the cart 25% up from the bottom
    width: 100,
    height: cartHeight, // The height of the cart is 25% of the screen height
  };

  //Small Cart
  const [isSmallCartVisible, setIsSmallCartVisible] = useState(false);

  const onModalClose = () => {
    setIsSmallCartVisible(false);
  };

  return (
    <View
      style={{
        height: "100%",
        overflow: "scroll",
        position: "relative",
      }}
    >
      {isPendingCategoryList && (
        <ActivityIndicator size="small" color="#0000ff" />
      )}

      {isErrorCategoryList && (
        <ErrorMessage message={"Error while fetching categories"} />
      )}

      <Filter
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        setIsSorted={setIsSorted}
      />

      {isPendingProductList && isPendingSelectedCategoryProductList && (
        <ActivityIndicator size="small" color="#0000ff" />
      )}

      {isErrorProductList && isErrorSelectedCategoryProductList && (
        <ErrorMessage message={"Error while fetching products"} />
      )}
      <View style={{ justifyContent: "space-between", alignItems: "center" }}>
        <FlatList
          numColumns={2}
          data={displayProductList}
          keyExtractor={(item) => item.id.toString()} // assuming each product has a unique id
          renderItem={({ item: product }) => (
            <View style={{ justifyContent: "space-between", marginRight: 15 }}>
              <DraggableItem
                item={product}
                cartPosition={cartPosition}
                setIsSmallCartVisible={setIsSmallCartVisible}
              >
                <ProductCard
                  product={product}
                  onPress={() => {
                    handleAddItem(product);
                    setIsSmallCartVisible(true);
                  }}
                />
              </DraggableItem>
            </View>
          )}
        />
      </View>

      <SmallCart isSmallCartVisible={isSmallCartVisible} onClose={onModalClose}>
        <SmallCartProductCard />
      </SmallCart>
    </View>
  );
};

export const ErrorMessage = ({ message, style }: any) => {
  return (
    <Text
      style={{
        color: "red",
        fontSize: 12,
        fontWeight: "600",
        alignSelf: "center",
        marginVertical: 5,
        ...style,
      }}
    >
      {message}
    </Text>
  );
};

const Filter = ({
  categoryList,
  selectedCategory,
  handleCategorySelect,
  setIsSorted,
}: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        marginVertical: 5,
        alignItems: "center",
      }}
    >
      <FlatList
        horizontal
        data={categoryList}
        keyExtractor={(item) => item}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            style={{
              padding: 5,
              paddingHorizontal: 12,
              borderRadius: 25,
              backgroundColor: selectedCategory === category ? "blue" : "white",
              marginRight: 10,
            }}
            onPress={() => handleCategorySelect(category)}
          >
            <Text
              style={{
                textTransform: "capitalize",
                fontWeight: "600",
                color: selectedCategory === category ? "white" : "black",
              }}
            >
              {category}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          padding: 5,
          borderRadius: 25,
          backgroundColor: "white",
        }}
        onPress={() => setIsSorted((prev: boolean) => !prev)}
      >
        <Ionicons name="funnel-outline" size={22} color={"gray"} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
