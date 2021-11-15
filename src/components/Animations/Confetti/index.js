import React from "react";
import { View, SafeAreaView } from "react-native";
import Lottie from "lottie-react-native";

import ConfettiAnimation from "./confetti-animation.json";

export const Confetti = () => {
  return (
    <SafeAreaView
      style={{
        height: "90%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 10,
      }}>
      <Lottie source={ConfettiAnimation} resizeMode="contain" autoPlay loop />
    </SafeAreaView>
  );
};
