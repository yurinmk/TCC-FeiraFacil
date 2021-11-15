import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";

import Icon from "react-native-vector-icons/dist/FontAwesome";

import { ListsContext } from "../../../context/lists";
import { BackgroundApp, primaryBlue, primaryRed } from "../../../global/styles";
import { HeaderSearchProducts } from "../../../components/Header/HeaderSearchProducts";
import { DropDown } from "../../../components/DropDown";

export const ProductsList = () => {
  const navigation = useNavigation();
  const {
    data,
    removeProductList,
    editProduct,
    addNewProduct,
    editHistoric,
    filterCategories,
  } = useContext(ListsContext);
  const {
    categories,
    current_list: { filterProducts, isNewProduct },
  } = data;

  const [IMGStandard] = useState("https://i.imgur.com/Yfvdlaq.jpg");

  function goBack() {
    navigation.dispatch(StackActions.pop(1));
  }

  function handleAddProduct(product) {
    const productTemp = {
      ...product,
      onList: true,
    };

    editProduct(productTemp);
    editHistoric(productTemp);
  }

  function goEditItem(product, type) {
    navigation.navigate("EditItem", { product, type });
  }

  function onChangeCategory(value) {
    filterCategories(value);
  }

  function itemList({ item }) {
    return (
      <TouchableOpacity
        style={styles.container_item}
        onPress={() => goEditItem(item)}>
        <View style={styles.image}>
          <Image
            style={styles.img}
            source={{ uri: item.img_url ? item.img_url : IMGStandard }}
          />
        </View>

        <View style={styles.item_name}>
          <Text style={styles.text}>{item.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            item.onList ? removeProductList(item) : handleAddProduct(item)
          }>
          <View
            style={
              item.onList ? styles.border_icon_close : styles.border_icon_plus
            }>
            <Icon
              name={item.onList ? "close" : "plus"}
              size={15}
              color="#FFF"
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  function itemNotInList() {
    const newProduct = {
      name: isNewProduct.name,
      category_key: "sem_categoria",
      category_name: "Sem Categoria",
      unity: "un",
      img_url: "https://i.imgur.com/Yfvdlaq.jpg",
      price: 0.0,
      onCart: false,
      onList: true,
      quantity: 1,
    };

    return (
      <TouchableOpacity
        style={styles.container_item}
        onPress={() => goEditItem(newProduct, "newProd")}>
        <View style={styles.image}>
          <Image style={styles.img} source={{ uri: IMGStandard }} />
        </View>

        <View style={styles.item_name}>
          <Text style={styles.text}>{isNewProduct.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            addNewProduct(newProduct);
          }}>
          <View style={styles.border_icon_plus}>
            <Icon name="plus" size={15} color="#FFF" />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderSearchProducts goBack={goBack} />
      </View>

      <View style={styles.main}>
        <View style={styles.dropdown}>
          <DropDown
            items={categories}
            onChange={onChangeCategory}
            placeholder="Categorias"
          />
        </View>

        <FlatList
          data={filterProducts}
          renderItem={itemList}
          keyExtractor={(item) => item.name}
          ListFooterComponent={
            isNewProduct && isNewProduct.status ? itemNotInList : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: BackgroundApp,
  },
  header: {
    width: "100%",
    height: "20%",

    position: "relative",
    top: 0,
  },
  main: {
    width: "100%",
    height: "80%",
    marginTop: 15,
  },
  dropdown: {
    width: "90%",
    paddingBottom: 10,

    alignSelf: "center",
  },
  container_item: {
    width: "90%",
    height: 60,

    marginLeft: 20,
    marginBottom: 15,

    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fefefe",
  },
  image: {
    width: "20%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },
  item_name: {
    width: "60%",
  },
  text: {
    fontSize: 18,
    textAlign: "left",
  },
  icon: {
    width: "20%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  border_icon_plus: {
    width: 30,
    height: 30,

    borderRadius: 30 / 2,
    elevation: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },

  border_icon_close: {
    width: 30,
    height: 30,

    borderRadius: 30 / 2,
    elevation: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryRed,
  },
});
