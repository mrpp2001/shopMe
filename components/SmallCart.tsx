import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SmallCart({
  isSmallCartVisible,
  children,
  onClose,
}: any) {
  return (
    <View
      style={{
        ...styles.modalContent,
        display: isSmallCartVisible ? "flex" : "none",
      }}
    >
      <Pressable
        onPress={onClose}
        style={{ position: "absolute", right: 10, top: 10, zIndex: 10 }}
      >
        <MaterialIcons name="close" color="black" size={22} />
      </Pressable>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: -4,
  },
});
