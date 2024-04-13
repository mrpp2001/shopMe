import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SmallCart({ isVisible, children, onClose }) {
  return (
    <View
      style={{ ...styles.modalContent, display: isVisible ? "flex" : "none" }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Drag Items</Text>
        <Pressable onPress={onClose}>
          <MaterialIcons name="close" color="black" size={22} />
        </Pressable>
      </View>
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
  titleContainer: {
    height: "16%",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
