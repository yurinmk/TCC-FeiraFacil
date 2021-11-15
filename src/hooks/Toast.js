import Toast from "react-native-toast-message";

export const useToast = () => {
  function showToast(type, message) {
    Toast.show({
      type: type,
      position: "top",
      text1: message.text1,
      text2: message.text2,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  return {
    show: showToast,
  };
};
