import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";

import Toast from "react-native-toast-message";
import Close from "react-native-vector-icons/dist/Ionicons";
import Eye from "react-native-vector-icons/dist/FontAwesome5";

import HelloIMG from "../../../assets/ola-novamente.png";
import GoogleIMG from "../../../assets/google.png";
import formValidation from "./SignInValidation";

import { ListsContext } from "../../../context/lists";
import {
  BackgroundApp,
  primaryBlue,
  secondaryBlue,
  primaryRed,
} from "../../../global/styles";

export const SignInForm = ({ closeOpen, close }) => {
  const Navigation = useNavigation();

  const { googleLogin, defaultLogin } = useContext(ListsContext);

  const [loadingG, setLoadingG] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [validation, setValidation] = useState(false);
  const [validationEmail, setValidationEmail] = useState(false);
  const [validationPassword, setValidationPassword] = useState(false);
  const [eye, setEye] = useState("eye");
  const [passwordEye, setPasswordEye] = useState(true);

  const { values, errors, setFieldValue } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidation,
  });

  useEffect(() => {
    if (values.email !== "") {
      setValidationEmail(false);
    }
    if (values.password !== "") {
      setValidationPassword(false);
    }
  }, [values]);

  function goHome() {
    Navigation.navigate("Home");
  }

  async function signInGoogle() {
    setLoadingG(true);
    const response = await googleLogin();
    if (response) {
      goHome();
      setLoadingG(false);
    } else {
      setLoadingG(false);
    }
  }

  async function singInDefault() {
    setValidation(true);
    setLoadingD(true);
    if (validationSignIn()) {
      if (await defaultLogin(values)) {
        goHome();
        setLoadingD(false);
      } else {
        setLoadingD(false);
      }
    } else {
      setLoadingD(false);
    }
  }

  function validationSignIn() {
    if (errors.email) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: errors.email,
      });
      return;
    }

    if (errors.password) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: errors.password,
      });
      return;
    }

    if (values.email === "" || values.password === "") {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Verifique os campos obrigatórios!",
      });
      setValidationEmail(true);
      setValidationPassword(true);
      return;
    }
    return true;
  }

  function handleEyePassword() {
    setPasswordEye(!passwordEye);
    if (eye === "eye") {
      setEye("eye-slash");
    } else {
      setEye("eye");
    }
  }

  return (
    <KeyboardAvoidingView style={styles.modalize} behavior="height">
      <TouchableOpacity
        style={styles.btn_close}
        onPress={() => close("sign-in")}>
        <Close name="md-close" color="#FFF" size={20} />
      </TouchableOpacity>
      <View style={styles.content_img_modalize}>
        <Image source={HelloIMG} style={styles.hello_img} />
      </View>
      <View style={styles.content_text_inputs_modalize}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          style={
            validation
              ? errors.email || validationEmail
                ? styles.input_error
                : styles.text_input
              : styles.text_input
          }
          placeholder="E-mail"
          value={values.email}
          onChangeText={(text) => setFieldValue("email", text)}
        />

        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity style={styles.btn_eye} onPress={handleEyePassword}>
            <Eye name={eye} size={25} color={primaryBlue} />
          </TouchableOpacity>

          <Text style={styles.text}>Senha</Text>
          <TextInput
            autoComplete="password"
            secureTextEntry={passwordEye}
            style={
              validation
                ? errors.password || validationPassword
                  ? styles.input_error
                  : styles.text_input
                : styles.text_input
            }
            placeholder="******"
            value={values.password}
            onChangeText={(text) => setFieldValue("password", text)}
          />
        </View>

        <TouchableOpacity
          style={styles.btn_login}
          onPress={loadingG || loadingD ? null : singInDefault}>
          {loadingD ? (
            <ActivityIndicator size="large" color={primaryBlue} />
          ) : (
            <Text style={styles.text_btn_login}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_google}
          onPress={loadingG || loadingD ? null : signInGoogle}>
          {loadingG ? (
            <ActivityIndicator size="large" color={primaryBlue} />
          ) : (
            <>
              <Text style={styles.text_btn_google}>Entrar com</Text>
              <Image source={GoogleIMG} style={styles.google_img} />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.content_warning}>
          <Text style={styles.text_warning}>Ainda não possui uma conta?</Text>
          <TouchableOpacity style={styles.btn_sign_up} onPress={closeOpen}>
            <Text style={styles.text_sign_up}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalize: {
    flex: 1,
    height: 700,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    backgroundColor: BackgroundApp,
  },
  btn_close: {
    width: 30,
    height: 30,

    marginTop: 10,
    marginRight: 20,

    borderRadius: 30 / 2,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,

    backgroundColor: primaryRed,
  },
  content_img_modalize: {
    width: "100%",
    height: "40%",
  },
  hello_img: {
    width: "100%",
    height: "100%",

    resizeMode: "contain",
  },
  content_text_inputs_modalize: {
    width: "100%",
    height: "60%",

    alignItems: "center",
  },
  text: {
    paddingLeft: 30,
    marginTop: 15,
    alignSelf: "flex-start",
    fontSize: 18,
    fontFamily: "BowlbyOneSC-Regular",
    color: primaryBlue,
  },
  text_input: {
    width: "90%",
    height: 55,
    marginTop: 10,
    paddingLeft: 15,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#f2f0f0",
  },
  input_error: {
    width: "90%",
    height: 55,
    marginTop: 10,
    paddingLeft: 15,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#f7d7d9",
  },
  btn_login: {
    width: "90%",
    height: 55,
    marginTop: 25,
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
  text_btn_login: {
    fontSize: 18,
    fontFamily: "BowlbyOneSC-Regular",
    color: "#FFF",
  },
  btn_google: {
    width: "90%",
    height: 55,
    marginTop: 10,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f2f0f0",
  },
  text_btn_google: {
    fontSize: 18,
    fontFamily: "BowlbyOneSC-Regular",
    color: primaryBlue,
  },
  google_img: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  content_warning: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text_warning: {
    fontSize: 12,
    fontFamily: "BowlbyOneSC-Regular",
    color: secondaryBlue,
  },
  btn_sign_up: {
    marginLeft: 5,
  },
  text_sign_up: {
    fontSize: 12,
    fontFamily: "BowlbyOneSC-Regular",
    color: primaryBlue,
  },
  btn_eye: {
    width: 55,
    height: 55,

    position: "absolute",
    right: 30,
    top: 50,
    elevation: 6,
    zIndex: 10,

    alignItems: "center",
    justifyContent: "center",
  },
});
