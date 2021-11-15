import React, { useEffect, useContext, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ListsContext } from "../context/lists";

export const ModalAvatar = ({ close }) => {
  const { data, selectAvatar } = useContext(ListsContext);

  return (
    <View style={styles.container}>
      {data.avatars.map((img) => {
        return (
          <TouchableOpacity
            key={img}
            style={styles.container_img}
            onPress={() => {
              selectAvatar(img);
              close();
            }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50 / 2,
                resizeMode: "contain",
              }}
              source={{ uri: img }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "90%",
    height: "100%",

    flexWrap: "wrap",
    flexDirection: "row",

    alignSelf: "center",
    justifyContent: "space-around",
  },
  container_img: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#85F0FF",
    borderRadius: 80 / 2,
    marginTop: 10,
    marginBottom: 10,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fff",
  },
});
