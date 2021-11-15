import React, { useRef, useState } from "react";
import { TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Plus from "react-native-vector-icons/dist/Entypo";
import CarShop from "react-native-vector-icons/dist/MaterialIcons";
import CreateProduct from "react-native-vector-icons/dist/Entypo";

import { primaryBlue } from "../../../global/styles";

export const ButtonPlus = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);

  const animation_rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const animation_create_product = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      },
    ],
  };

  const animation_add_product = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      },
    ],
  };

  function goProducts() {
    navigation.navigate("Products");
    toggleMenu();
  }

  function toggleMenu() {
    let toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={goProducts}>
        <Animated.View style={[styles.btn_add_product, animation_add_product]}>
          <CarShop name="post-add" size={30} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.btn_create_product, animation_create_product]}>
          <CreateProduct name="upload" size={20} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          toggleMenu();
        }}>
        <Animated.View style={[styles.btn_plus, animation_rotation]}>
          <Plus name="plus" size={40} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  btn_plus: {
    width: 60,
    height: 60,

    borderWidth: 1,
    borderRadius: 60 / 2,
    borderColor: "#fff",

    position: "absolute",
    zIndex: 9999,
    bottom: 35,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },
  btn_add_product: {
    width: 45,
    height: 45,

    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: "#fff",

    position: "absolute",
    zIndex: 5,
    bottom: 110,
    right: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },
  btn_create_product: {
    width: 45,
    height: 45,

    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: "#fff",

    position: "absolute",
    zIndex: 5,
    bottom: 110,
    left: 130,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },
});
