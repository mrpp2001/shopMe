import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ConfirmationModal = ({
  isConfirmed,
  setIsConfirmed,
  message,
  ButtonName,
  onPress,
  style,
}: any) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isConfirmed}>
      <View style={styles.modalContent}>
        <Text style={{ fontSize: 16 }}>{message}</Text>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignSelf: "flex-end",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsConfirmed(false)}
            style={{ ...styles.button }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.button, ...style }}
          >
            <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
              {ButtonName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "lightgray",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    padding: 15,
  },

  button: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },

  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
