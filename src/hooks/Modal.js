import React, { useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Close from "react-native-vector-icons/dist/Ionicons";
import { primaryRed } from "../global/styles";

export const useModal = () => {
  const [visible, setVisible] = useState(false);

  const ModalComponet = ({ children }) => {
    return (
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.container_modal}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.btn_close}
              onPress={() => setVisible(false)}>
              <Close name="md-close" color="#FFF" size={16} />
            </TouchableOpacity>
            <View style={styles.children}>{children}</View>
          </View>
        </View>
      </Modal>
    );
  };

  return {
    ModalComponet: ModalComponet,
    show: () => setVisible(!visible),
  };
};

const styles = StyleSheet.create({
  container_modal: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    width: "80%",
    maxHeight: "80%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fefefe",
  },
  btn_close: {
    width: 20,
    height: 20,

    marginTop: 10,
    marginRight: 10,

    borderRadius: 20 / 2,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,

    backgroundColor: primaryRed,
  },
  children: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
