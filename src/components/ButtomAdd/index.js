import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Plus from "react-native-vector-icons/dist/Entypo";
import { primaryBlue } from "../../global/styles";

export const ButtomAdd = ({ open }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={open}>
      <Plus name="plus" size={30} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,

    position: "absolute",
    bottom: 20,
    right: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },
});
