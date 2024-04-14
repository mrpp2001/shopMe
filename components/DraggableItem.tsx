import { useCart } from "@/store/store";
import React, { useState } from "react";
import { PanResponder, Animated } from "react-native";

export const DraggableItem = ({
  item,
  cartPosition,
  setIsSmallCartVisible,
  children,
}: any) => {
  const { addItem } = useCart();
  const pan = useState(new Animated.ValueXY())[0];
  const initialPos = useState(new Animated.ValueXY())[0];
  const [isFirstDrag, setIsFirstDrag] = useState(true);

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
      // Store the initial position when the drag starts for the first time
      if (isFirstDrag) {
        initialPos.setValue({ x: pan.x._value, y: pan.y._value });
        setIsFirstDrag(false);
      }
      // Make the cart visible
      setIsSmallCartVisible(true);
    },
    onPanResponderMove: (e, gesture) => {
      Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      })(e, gesture);
      // Check if the item is over the cart
      if (isDropArea(gesture)) {
        addItem(item);
      }
    },
    onPanResponderRelease: (e, gesture) => {
      // Return the item to its original position
      Animated.spring(pan, {
        toValue: initialPos,
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
