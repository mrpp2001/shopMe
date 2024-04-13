import { useCart } from "@/store/authToken";
import React, { Children, useState } from "react";
import { Text, TouchableOpacity, PanResponder, Animated } from "react-native";

export const DraggableItem = ({
  item,
  cartPosition,
  setCurrentItem,
  setIsSmallCartVisible,
  children,
}) => {
  const { addItem } = useCart();
  const [startPosition, setStartPosition] = useState(null);
  const pan = useState(new Animated.ValueXY())[0];

  const isDropArea = (gesture) => {
    return (
      gesture.moveY > cartPosition.y &&
      gesture.moveY < cartPosition.y + cartPosition.height
    );
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      // Store the initial position when the drag starts
      setStartPosition({ x: pan.x._value, y: pan.y._value });
      // Make the cart visible
      setIsSmallCartVisible(true);
      setCurrentItem(item);
    },
    onPanResponderMove: (e, gesture) => {
      Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      })(e, gesture);
      // Check if the item is over the cart
      if (isDropArea(gesture)) {
        console.log(`Item over cart: ${item.id}`);
        addItem(item);
      } else {
        console.log("Item not over cart");
      }
    },
    onPanResponderRelease: (e, gesture) => {
      // Return the item to its original position
      Animated.spring(pan, {
        toValue: startPosition,
        useNativeDriver: false,
      }).start();
      pan.flattenOffset();
    },
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};
