import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useDeleteProduct, useProducts } from "@/api/useProducts";
import { useAdmin, useCart } from "@/store/authToken";
import { Ionicons } from "@expo/vector-icons";
import {
  useGetAllCategories,
  useSpecificCategory,
} from "@/api/useProductCategory";
import { CartComponent, DraggableItem } from "@/components/DraggableItem";
import SmallCart from "@/components/SmallCart";
import { ProductCard } from "@/components/ProductCard";

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

  const {
    mutate: deleteProduct,
    isPending: isPendingDeleteProduct,
    isError: isErrorDeleteProduct,
  } = useDeleteProduct();

  const { isAdmin } = useAdmin();
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
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const screenHeight = window.innerHeight;
  const cartHeight = 0.25 * screenHeight; // Cart height is 25% of the screen height
  const cartPosition = {
    x: 50,
    y: screenHeight - cartHeight, // Position the cart 25% up from the bottom
    width: 100,
    height: cartHeight, // The height of the cart is 25% of the screen height
  };

  //Small Cart
  const [isSmallCartVisible, setIsSmallCartVisible] = useState(false);

  const addProduct = () => {
    setIsSmallCartVisible(true);
  };

  const onModalClose = () => {
    setIsSmallCartVisible(false);
  };

  return (
    <View style={{ height: "100%", overflow: "scroll", position: "relative" }}>
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

      <View
        style={{
          padding: 10,
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10,
          height: "100%",
          overflow: "scroll",
          position: "relative",
        }}
      >
        {displayProductList?.map((product) => (
          <DraggableItem
            item={product}
            cartPosition={cartPosition}
            setCurrentItem={setCurrentItem}
            setIsSmallCartVisible={setIsSmallCartVisible}
          >
            <ProductCard
              product={product}
              onPress={() => handleAddItem(product)}
            />
          </DraggableItem>
        ))}

        {isCartVisible && <CartComponent currentItem={currentItem} />}
      </View>

      <SmallCart isVisible={isSmallCartVisible} onClose={onModalClose}>
        <Text>Hello</Text>
      </SmallCart>
    </View>
  );
};

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Text
      style={{
        color: "red",
        fontSize: 12,
        fontWeight: "600",
        alignSelf: "center",
        marginVertical: 5,
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
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          overflow: "scroll",
          width: "90%",
        }}
      >
        {categoryList?.map((category: any) => (
          <TouchableOpacity
            key={category}
            style={{
              padding: 5,
              paddingHorizontal: 12,
              borderRadius: 25,
              backgroundColor: selectedCategory === category ? "blue" : "white",
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
        ))}
      </View>
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
