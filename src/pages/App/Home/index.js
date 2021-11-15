import React, { useEffect, useContext, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import CheckBox from "react-native-vector-icons/dist/MaterialIcons";
import CarShop from "react-native-vector-icons/dist/FontAwesome5";
import Delete from "react-native-vector-icons/dist/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";

import { Welcome } from "../Welcome";
import {
  BackgroundApp,
  primaryBlue,
  primaryRed,
  secondaryBlue,
} from "../../../global/styles";

import { ListsContext } from "../../../context/lists";

import { ButtonPlus } from "./ButtonPlus";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Loading } from "../../../components/Loading";

const Home = ({ navigation }) => {
  const {
    data,
    addProductCart,
    removeProductCart,
    removeProductList,
    setFooterVisible,
  } = useContext(ListsContext);

  const StackNavigation = useNavigation();
  const modalizeFooterRef = useRef();

  const { loading, current_list, footerVisible, totalPriceProductCart } = data;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!footerVisible) {
        setTimeout(() => {
          modalizeFooterRef.current?.close();
        }, 100);
      }
    });

    return unsubscribe;
  }, []);

  function openModalize() {
    modalizeFooterRef.current?.open();
  }

  function closeModalize() {
    modalizeFooterRef.current?.close();
  }

  function LeftActions() {
    return (
      <View style={styles.container_delete}>
        <View style={styles.icon_delete}>
          <Delete name="delete" size={30} color="#FFF" />
        </View>
      </View>
    );
  }

  function goEditItem(product) {
    StackNavigation.navigate("EditItem", { product });
  }

  function ProductList() {
    let categories = current_list.productsList.filter(
      (prod) => prod.onList === true && prod.onCart === false,
    );

    let categoriesKey = categories.filter(function (filter) {
      return !this[filter.category_key] && (this[filter.category_key] = true);
    }, Object.create(null));

    return categoriesKey.map((category, index) => {
      return (
        <View style={styles.container_categories} key={index}>
          <View style={styles.container_title}>
            <Text style={styles.txt_title}>{category.category_name}</Text>
          </View>
          {current_list.productsList
            .filter(
              (product) =>
                product.category_key === category.category_key &&
                product.onList === true &&
                product.onCart === false,
            )
            .map((prod, index) => {
              return (
                <Swipeable
                  key={index}
                  renderLeftActions={LeftActions}
                  onSwipeableLeftOpen={() => removeProductList(prod)}>
                  <TouchableOpacity
                    onPress={() => goEditItem(prod)}
                    style={styles.container_product}>
                    <View style={styles.product}>
                      <Image
                        style={styles.img}
                        source={{ uri: prod.img_url }}
                      />
                      <Text style={styles.txt_prod}>{prod.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => addProductCart(prod)}>
                      <CheckBox
                        name="check-box-outline-blank"
                        size={25}
                        color={primaryBlue}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Swipeable>
              );
            })}
        </View>
      );
    });
  }

  function CartList() {
    let productsCart = current_list.productsList.filter(
      (prod) => prod.onCart === true,
    );

    if (productsCart.length) {
      return (
        <View style={styles.container_categories}>
          <View style={styles.container_title_cart}>
            <CarShop name="cart-plus" size={20} color="#FFF" />
            <Text style={styles.txt_title_cart}>Carrinho</Text>
          </View>
          {productsCart.map((prod, index) => {
            return (
              <Swipeable
                key={index}
                renderLeftActions={LeftActions}
                onSwipeableLeftOpen={() => removeProductList(prod)}>
                <TouchableOpacity
                  onPress={() => goEditItem(prod)}
                  style={styles.container_product_cart}>
                  <View style={styles.product_cart}>
                    <Image style={styles.img} source={{ uri: prod.img_url }} />
                    <Text style={styles.txt_prod_cart}>{prod.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeProductCart(prod)}>
                    <CheckBox name="check-box" size={25} color={primaryBlue} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Swipeable>
            );
          })}
        </View>
      );
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container_home}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />

          <View style={{ height: "10%" }}>
            <Header
              nameList={current_list?.name}
              openM={openModalize}
              closeM={closeModalize}
              addProdVisible={footerVisible}
            />
          </View>

          <View style={{ height: "90%", width: "100%", alignItems: "center" }}>
            {!footerVisible && (
              <View style={styles.container_market_name}>
                <View style={styles.content_market_name}>
                  <View style={styles.content_name}>
                    <Text style={styles.txt_market_name}>
                      {current_list?.marketName}
                    </Text>
                  </View>
                  <View style={styles.content_value}>
                    <CarShop name="cart-plus" size={20} color={primaryBlue} />
                    <Text style={styles.txt_value}>
                      R$: {totalPriceProductCart}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <SafeAreaView style={styles.container_sectionList}>
              <ScrollView>
                {ProductList()}
                {CartList()}
              </ScrollView>
            </SafeAreaView>
          </View>

          {footerVisible && <ButtonPlus />}

          <Modalize
            panGestureEnabled={false}
            ref={modalizeFooterRef}
            withHandle={false}
            modalHeight={75}
            alwaysOpen={footerVisible ? 75 : null}
            rootStyle={{ zIndex: -1 }}
            overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}>
            <Footer />
          </Modalize>
        </View>
      )}
    </>
  );
};

export const HomeScreen = ({ navigation }) => {
  const {
    data: { loading, welcome },
    getWelcome,
  } = useContext(ListsContext);

  useEffect(() => {
    getWelcome();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return welcome ? <Home navigation={navigation} /> : <Welcome />;
};

const styles = StyleSheet.create({
  container_home: {
    height: "100%",

    alignItems: "center",

    backgroundColor: BackgroundApp,
  },
  container_title: {
    width: "50%",
    height: 50,
    borderRadius: 10,

    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: secondaryBlue,
  },
  txt_title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container_delete: {
    width: "90%",
    height: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 10,

    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: primaryRed,
  },
  icon_delete: {
    width: "100%",
    height: "100%",

    marginLeft: 20,

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container_product: {
    width: "90%",
    height: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fff",
  },
  product: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 35,
    height: 35,
  },
  txt_prod: {
    fontSize: 16,
    marginLeft: 10,
  },
  container_title_cart: {
    width: "50%",
    height: 50,
    borderRadius: 10,

    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: secondaryBlue,
  },
  txt_title_cart: {
    marginLeft: 15,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container_product_cart: {
    width: "90%",
    height: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  product_cart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  txt_prod_cart: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  container_sectionList: {
    width: "100%",
    height: "90%",

    backgroundColor: BackgroundApp,
  },
  container_market_name: {
    width: "90%",
    height: "10%",

    alignItems: "center",
    justifyContent: "center",
  },
  content_market_name: {
    width: "100%",
    height: 60,
    borderWidth: 2,
    borderColor: primaryBlue,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#FFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content_name: {
    width: "60%",
    padding: 15,
  },
  txt_market_name: {
    fontSize: 16,
  },
  content_value: {
    width: "40%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  txt_value: {
    fontSize: 16,
    padding: 10,
  },
});
