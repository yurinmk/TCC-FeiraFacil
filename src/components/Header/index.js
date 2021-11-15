import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import MenuIcon from "react-native-vector-icons/dist/Entypo";
import Eye from "react-native-vector-icons/dist/FontAwesome5";
import Plus from "react-native-vector-icons/dist/Entypo";

import { primaryBlue } from "../../global/styles";
import { Popup } from "./Popup";
import { ListsContext } from "../../context/lists";

export const Header = ({ nameList, openM, closeM, addProdVisible }) => {
  const DrawerNavigation = useNavigation();
  const {
    data: { footerVisible },
  } = useContext(ListsContext);

  const [eye, setEye] = useState("eye");

  useEffect(() => {
    if (!footerVisible) {
      setEye("eye-slash");
    }
  }, []);

  function handleEye() {
    if (eye === "eye") {
      setEye("eye-slash");
      closeM();
    } else {
      setEye("eye");
      openM();
    }
  }

  function goProducts() {
    DrawerNavigation.navigate("Products");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container_btn_menu_burguer}>
          <TouchableOpacity onPress={() => DrawerNavigation.openDrawer()}>
            <MenuIcon name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View
          style={
            addProdVisible ? styles.container_title1 : styles.container_title2
          }>
          <Text style={styles.title}>{nameList}</Text>
        </View>

        <View
          style={
            addProdVisible
              ? styles.container_btn_dots1
              : styles.container_btn_dots2
          }>
          <TouchableOpacity onPress={handleEye}>
            <Eye name={eye} size={25} color="#FFF" />
          </TouchableOpacity>

          {!addProdVisible && (
            <TouchableOpacity style={{ paddingLeft: 5 }} onPress={goProducts}>
              <Plus name="plus" size={30} color="#FFF" />
            </TouchableOpacity>
          )}

          <Popup />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "10%",
    // position: "absolute",
    // top: 0,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: primaryBlue,
  },
  container_btn_menu_burguer: {
    width: "10%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container_title1: {
    width: "70%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container_title2: {
    width: "60%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: 10,
  },
  container_btn_dots1: {
    width: "20%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container_btn_dots2: {
    width: "30%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    fontSize: 20,
    color: "#fff",
  },
});
