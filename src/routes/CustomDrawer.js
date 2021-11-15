import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import Home from "react-native-vector-icons/dist/Ionicons";
import Information from "react-native-vector-icons/dist/Ionicons";
import Lists from "react-native-vector-icons/dist/MaterialCommunityIcons";
import ListProducts from "react-native-vector-icons/dist/FontAwesome";
import Categories from "react-native-vector-icons/dist/FontAwesome5";
import Expenses from "react-native-vector-icons/dist/MaterialIcons";
import Edit from "react-native-vector-icons/dist/Entypo";
import SignIn from "react-native-vector-icons/dist/Octicons";
import SignOut from "react-native-vector-icons/dist/FontAwesome";

import { primaryBlue, primaryRed } from "../global/styles";
import { ListsContext } from "../context/lists";
import { ModalAvatar } from "./ModalAvatar";
import { useModal } from "../hooks/Modal";

export const CustomDrawer = () => {
  const DrawerNavigation = useNavigation();
  const {
    data: { avatar, userData },
    signOut,
  } = useContext(ListsContext);
  const { ModalComponet, show } = useModal();

  const [standardAvatar] = useState("https://i.imgur.com/SLchjY4.png");

  function goHome() {
    DrawerNavigation.navigate("Home");
  }

  function goHistoric() {
    DrawerNavigation.navigate("Historic");
  }

  function goCategories() {
    DrawerNavigation.navigate("Categories");
  }

  function goProductsList() {
    DrawerNavigation.navigate("Products");
  }

  async function goLogin(what) {
    if (what === "sign-in") {
      DrawerNavigation.navigate("Login");
    } else {
      signOut();
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={["#abb3ff", "#5162f5", "#201dc4", "#22286B"]}
        style={styles.container_avatar}>
        <View style={styles.avatar}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50 / 2,
              resizeMode: "contain",
            }}
            source={{ uri: avatar ? avatar : standardAvatar }}
          />

          <TouchableOpacity style={styles.btn_edit} onPress={show}>
            <Edit name="edit" size={20} color={primaryBlue} />
          </TouchableOpacity>
        </View>

        {userData ? (
          <View style={styles.container_given_name}>
            <Text style={styles.txt_given_name}>{userData.given_name}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => goLogin("sign-in")}>
            <View style={styles.sign_in}>
              <SignIn name="sign-in" size={30} color={primaryBlue} />
            </View>
          </TouchableOpacity>
        )}
      </LinearGradient>

      <ModalComponet>
        <ScrollView>
          <ModalAvatar close={show} />
        </ScrollView>
      </ModalComponet>

      <DrawerContentScrollView>
        <DrawerItem
          icon={({ color, size }) => (
            <Home name="home" size={size} color={primaryBlue} />
          )}
          label="Home"
          onPress={goHome}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Lists name="clipboard-list" size={size} color={primaryBlue} />
          )}
          label="Listas"
          onPress={goHistoric}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Categories name="list-ul" size={size} color={primaryBlue} />
          )}
          label="Categorias"
          onPress={goCategories}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <ListProducts name="file-text" size={size} color={primaryBlue} />
          )}
          label="Lista de Produtos"
          onPress={goProductsList}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Expenses name="attach-money" size={size} color={primaryBlue} />
          )}
          label="Despesas"
          onPress={() => {}}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Information
              name="information-circle-sharp"
              size={size}
              color={primaryBlue}
            />
          )}
          label="Sobre"
          onPress={() => {}}
        />
      </DrawerContentScrollView>

      {userData && (
        <TouchableOpacity
          style={styles.btn_close}
          onPress={() => goLogin("sign-out")}>
          <Text style={styles.txt_btn_close}>SAIR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_avatar: {
    height: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#85F0FF",
    borderRadius: 100 / 2,
    marginLeft: 10,

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
  btn_edit: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: primaryBlue,
    borderRadius: 30 / 2,
    position: "absolute",
    bottom: 0,
    right: -5,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#e8eafa",
  },
  container_given_name: {
    width: "60%",
  },
  txt_given_name: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
  },
  sign_in: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#85F0FF",
    borderRadius: 50 / 2,
    marginRight: 15,

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
  sign_in_img: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  btn_close: {
    width: "70%",
    height: 40,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    position: "absolute",
    bottom: 30,

    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",

    backgroundColor: primaryRed,
  },
  txt_btn_close: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});
