import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";

export const DraggableItem = ({
  item,
  index,
  cartPosition,
  setCartVisible,
  setCurrentItem,
}) => {
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
      setCartVisible(true);
      setCurrentItem(item);
    },
    onPanResponderMove: (e, gesture) => {
      Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      })(e, gesture);
      // Check if the item is over the cart
      if (isDropArea(gesture)) {
        console.log(`Item over cart: ${item.id}`);
      } else {
        console.log("Item not over cart");
      }
    },
    onPanResponderRelease: (e, gesture) => {
      //   if (!isDropArea(gesture)) {
      //     // Hide the cart
      //     setCartVisible(false);
      //   }
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
        backgroundColor: "green",
        padding: 10,
      }}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity>
        <Text>{item.id}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const CartComponent = ({ currentItem }) => {
  const handlePressIn = () => {
    if (currentItem) {
      console.log(`Item in cart: ${currentItem.id}`);
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      style={{ position: "absolute", right: 0, top: 0 }}
    >
      <View>
        <Text style={{ backgroundColor: "red", color: "white", padding: 10 }}>
          Hello
        </Text>
      </View>
    </TouchableOpacity>
  );
};
