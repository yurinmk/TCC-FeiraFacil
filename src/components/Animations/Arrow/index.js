import React from "react";
import { View } from "react-native";
import Lottie from "lottie-react-native";

import ArrowAnimation from "./arrow-animation.json";

export const Arrow = () => {
  return (
    <>
      <Lottie
        style={{ width: 50, height: 50 }}
        source={ArrowAnimation}
        resizeMode="contain"
        autoPlay
        loop
      />
    </>
  );
};
