import { View } from "react-native";
import React from "react";
import Toast, { BaseToastProps } from "react-native-toast-message";

interface ToastProps {
  title: string;
  message: string;
}

export const showToast = ({ title, message }: ToastProps): void => {
  Toast.show({
    type: "success",
    position: "bottom",
    text1: title,
    text2: message,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export const ToastMessage = () => {
  return (
    <View style={{ zIndex: 10 }}>
      <Toast ref={(ref: BaseToastProps | null) => Toast.setRef(ref)} />
    </View>
  );
};
