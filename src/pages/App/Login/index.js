import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import Menu from "react-native-vector-icons/dist/Entypo";

import FairIMG from "../../../assets/feira-principal.png";

import {
  BackgroundApp,
  primaryBlue,
  secondaryBlue,
} from "../../../global/styles";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const Login = () => {
  const DrawerNavigation = useNavigation();

  const modalizeRefSignInForm = useRef();
  const modalizeRefSignUpForm = useRef();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "331806103827-1pij2f495n86dqb1he7ev7dkb0441aea.apps.googleusercontent.com",
    });
  }, []);

  function onClose(what) {
    if (what === "sign-in") {
      modalizeRefSignInForm.current?.close();
    } else {
      modalizeRefSignUpForm.current?.close();
    }
  }

  function onOpenSignInForm() {
    modalizeRefSignInForm.current?.open();
  }

  function onOpenSignUpForm() {
    modalizeRefSignUpForm.current?.open();
  }

  function onCloseSignInForm() {
    modalizeRefSignInForm.current?.close();
    onOpenSignUpForm();
  }

  function onCloseSignUpForm() {
    modalizeRefSignUpForm.current?.close();
    onOpenSignInForm();
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => DrawerNavigation.openDrawer()}>
          <Menu name="menu" size={25} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.content_img}>
          <Text style={styles.text}>Feira Fácil</Text>

          <Image source={FairIMG} style={styles.img} />

          <Text style={styles.text2}>Bem vindo ao nosso grupo</Text>
        </View>
        <View style={styles.content_btns}>
          <TouchableOpacity
            style={styles.btn_sign_up}
            onPress={onOpenSignUpForm}>
            <Text style={styles.text_btn_sign_up}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn_sign_in}
            onPress={onOpenSignInForm}>
            <Text style={styles.text_btn_sign_in}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modalize
        ref={modalizeRefSignUpForm}
        withHandle={false}
        modalStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <SignUpForm closeOpen={onCloseSignUpForm} close={onClose} />
      </Modalize>
      <Modalize
        ref={modalizeRefSignInForm}
        withHandle={false}
        modalStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <SignInForm closeOpen={onCloseSignInForm} close={onClose} />
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundApp,

    alignItems: "center",
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 1,
    borderColor: "#FFF",
    marginLeft: 30,
    marginTop: 30,

    top: 0,
    left: 0,
    zIndex: 6,
    position: "absolute",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },
  content_img: {
    width: "90%",
    height: "70%",
    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignItems: "center",

    borderRadius: 30,
    backgroundColor: "#f2f0f0",
  },
  text: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: "BowlbyOneSC-Regular",

    color: primaryBlue,
  },
  text2: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "BowlbyOneSC-Regular",
    marginBottom: 20,

    bottom: 0,
    position: "absolute",

    color: primaryBlue,
  },
  img: {
    width: 400,
    height: 400,
    marginTop: 40,
    resizeMode: "contain",
    top: 0,
    position: "absolute",
  },
  content_btns: {
    width: "90%",
    height: "30%",

    alignItems: "center",
    justifyContent: "center",
  },
  btn_sign_up: {
    width: "100%",
    height: 60,
    marginBottom: 20,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: secondaryBlue,
  },
  btn_sign_in: {
    width: "100%",
    height: 60,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f2f0f0",
  },
  text_btn_sign_up: {
    fontSize: 16,
    fontFamily: "BowlbyOneSC-Regular",

    color: "#FFF",
  },
  text_btn_sign_in: {
    fontSize: 16,
    fontFamily: "BowlbyOneSC-Regular",

    color: "#000",
  },
});
