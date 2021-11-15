import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Arrow from "react-native-vector-icons/dist/Feather";
import Search from "react-native-vector-icons/dist/Feather";
import { primaryBlue } from "../../global/styles";
import { ListsContext } from "../../context/lists";

export const HeaderSearchProducts = ({ goBack }) => {
  const { data, searchProducts } = useContext(ListsContext);
  const {
    current_list: { name, isNewProduct },
  } = data;
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchProducts(search);
  }, [search]);

  useEffect(() => {
    if (!isNewProduct) {
      setSearch("");
    }
  }, [isNewProduct]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <TouchableOpacity style={styles.content_icon} onPress={goBack}>
            <Arrow name="arrow-left" size={30} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.content_txt}>
            <Text style={styles.txt}>{name}</Text>
          </View>
        </View>

        <View style={styles.search}>
          <View style={styles.content_icon_search}>
            <Search name="search" size={20} color={primaryBlue} />
          </View>

          <View style={styles.content_input}>
            <TextInput
              style={styles.input}
              onChangeText={setSearch}
              placeholder="Pesquise um produto"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
    width: "100%",

    backgroundColor: primaryBlue,
  },
  title: {
    width: "100%",
    height: "40%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content_icon: {
    width: "10%",
    height: "100%",
    marginLeft: 5,
    paddingTop: 20,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content_txt: {
    width: "90%",
    height: "100%",
    marginLeft: 10,
    paddingTop: 20,

    display: "flex",
    justifyContent: "center",
  },
  txt: {
    fontSize: 20,
    textAlign: "left",
    color: "#FFF",
  },
  search: {
    width: "100%",
    height: "60%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content_icon_search: {
    width: "10%",
    height: "100%",
    position: "absolute",
    left: 20,
    bottom: 0,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content_input: {
    width: "90%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 45,
    paddingLeft: 40,
    fontSize: 15,

    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
