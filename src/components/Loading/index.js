import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { BackgroundApp } from "../../global/styles";

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: BackgroundApp,
  },
});
