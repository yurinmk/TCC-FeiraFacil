import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Tag from "react-native-vector-icons/dist/AntDesign";
import { ButtomAdd } from "../../../components/ButtomAdd";

import { Loading } from "../../../components/Loading";
import { ListsContext } from "../../../context/lists";
import { BackgroundApp, primaryBlue } from "../../../global/styles";
import { useModal } from "../../../hooks/Modal";
import { AddCategory } from "./AddCategory";

export const Categories = () => {
  const { ModalComponet, show } = useModal();
  const {
    data: { categories },
  } = useContext(ListsContext);
  const [arrayCategories, setArrayCategories] = useState([]);

  useEffect(() => {
    setArrayCategories(
      categories.filter(
        (category) =>
          category.value !== "todas" && category.value !== "sem_categoria",
      ),
    );
  }, [categories]);

  function CategoryItem({ item }) {
    return (
      <View style={styles.container_item}>
        <View style={styles.container_icon}>
          <Tag name="tags" size={30} color={primaryBlue} />
        </View>
        <View style={styles.container_txt}>
          <Text style={styles.txt_title}>{item.label}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {arrayCategories.length ? (
        <>
          <FlatList
            data={arrayCategories}
            keyExtractor={(item) => item.id}
            renderItem={CategoryItem}
          />

          <ButtomAdd open={show} />

          <ModalComponet>
            <AddCategory close={show} />
          </ModalComponet>
        </>
      ) : (
        <Loading />
      )}
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
  container_item: {
    width: "95%",
    height: 70,
    marginTop: 10,
    marginBottom: 5,

    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    backgroundColor: "#fefefe",
  },
  container_icon: {
    width: "20%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container_txt: {
    width: "80%",
    height: "100%",

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  txt_title: {
    fontSize: 16,
    paddingLeft: 10,
  },
});
