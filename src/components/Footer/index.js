import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Calculator from "react-native-vector-icons/dist/FontAwesome5";
import CarShop from "react-native-vector-icons/dist/FontAwesome5";

import { primaryBlue } from "../../global/styles";
import { ListsContext } from "../../context/lists";

export const Footer = () => {
  const {
    data: { current_list },
    setPriceProductsCart,
  } = useContext(ListsContext);

  const [totalProductsList, setTotalProductsList] = useState(0);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [totalPriceProductsCart, setTotalPriceProductsCart] = useState(0);

  const { productsList } = current_list;

  useEffect(() => {
    let qttProductsList = 0;
    let tpProductsCart = 0.0;

    productsList.forEach((product) => {
      if (product.onList && !product.onCart) {
        qttProductsList++;
      }
    });

    productsList.forEach((product) => {
      if (product.onCart) {
        if (product.unity === "g" || product.unity === "ml") {
          tpProductsCart += parseFloat(product.price);
        } else {
          tpProductsCart +=
            parseFloat(product.price) * parseInt(product.quantity);
        }
      }
    });
    setTotalProductsList(qttProductsList);
    setTotalProductsCart(
      productsList.filter((prod) => prod.onCart === true).length,
    );
    setTotalPriceProductsCart(tpProductsCart.toFixed(2));
    setPriceProductsCart(tpProductsCart.toFixed(2));
  }, [current_list]);

  return (
    <View style={[styles.container]}>
      <View style={styles.container_items}>
        <Calculator name="clipboard-list" size={30} color="#FFF" />
        <View style={styles.container_txt}>
          <Text style={styles.txt_items}>ITENS ({totalProductsList})</Text>
        </View>
      </View>

      <View style={styles.container_carshop}>
        <CarShop name="cart-arrow-down" size={25} color="#FFF" />
        <View style={styles.container_txt}>
          <Text style={styles.txt_carshop}>CARRINHO ({totalProductsCart})</Text>
          <Text style={styles.txt_carshop}>R$: {totalPriceProductsCart}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // width: "100%",
    // height: "100%",
    // position: "absolute",
    // bottom: 0,

    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: primaryBlue,
  },
  container_items: {
    width: "50%",
    height: "100%",
    padding: 20,

    // position: "absolute",
    // left: 0,
    alignItems: "center",

    flexDirection: "row",
    justifyContent: "flex-start",
  },
  container_carshop: {
    width: "50%",
    height: "100%",
    padding: 20,

    // position: "absolute",
    // right: 0,
    alignItems: "center",

    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container_txt: {
    paddingLeft: 15,
  },
  txt_items: {
    color: "#fff",
    textAlign: "left",
    paddingLeft: 5,
  },
  txt_carshop: {
    color: "#fff",
    textAlign: "left",
  },
});
