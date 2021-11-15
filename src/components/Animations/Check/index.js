import React from "react";
import { View } from "react-native";
import Lottie from "lottie-react-native";

import CheckAnimation from "./check-animation.json";

export const Check = () => {
  return (
    <>
      <Lottie
        style={{ width: 80, height: 80 }}
        source={CheckAnimation}
        resizeMode="contain"
        autoPlay
        loop
      />
    </>
  );
};
