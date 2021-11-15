import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";

import Toast from "react-native-toast-message";
import Close from "react-native-vector-icons/dist/Ionicons";
import Eye from "react-native-vector-icons/dist/FontAwesome5";

import {
  BackgroundApp,
  primaryBlue,
  secondaryBlue,
  primaryRed,
} from "../../../global/styles";
import { ListsContext } from "../../../context/lists";

import FairIMG from "../../../assets/feira.png";
import GoogleIMG from "../../../assets/google.png";
import formValidation from "./SignUpValidation";

export const SignUpForm = ({ closeOpen, close }) => {
  const Navigation = useNavigation();

  const { signUpGoogle, signUpDefault } = useContext(ListsContext);

  const [loadingG, setLoadingG] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [validation, setValidation] = useState(false);
  const [validationName, setValidationName] = useState(false);
  const [validationSurname, setValidationSurname] = useState(false);
  const [validationEmail, setValidationEmail] = useState(false);
  const [validationPassword, setValidationPassword] = useState(false);
  const [validationConfirmPassword, setValidationConfirmPassword] =
    useState(false);
  const [eye1, setEye1] = useState("eye");
  const [eye2, setEye2] = useState("eye");
  const [passwordEye1, setPasswordEye1] = useState(true);
  const [passwordEye2, setPasswordEye2] = useState(true);

  const { values, errors, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: formValidation,
  });

  useEffect(() => {
    if (values.name !== "") {
      setValidationName(false);
    }
    if (values.surname !== "") {
      setValidationSurname(false);
    }
    if (values.email !== "") {
      setValidationEmail(false);
    }
    if (values.password !== "") {
      setValidationPassword(false);
    }
    if (values.confirm_password !== "") {
      setValidationConfirmPassword(false);
    }
  }, [values]);

  async function signUpG() {
    setLoadingG(true);
    if (await signUpGoogle()) {
      setLoadingG(false);
      Navigation.navigate("Home");
    } else {
      setLoadingG(false);
    }
  }

  async function signUpD() {
    setLoadingD(true);
    if (validationSignUp()) {
      if (await signUpDefault(values)) {
        setLoadingD(false);
        Navigation.navigate("Home");
      } else {
        setLoadingD(false);
      }
    } else {
      setLoadingD(false);
    }
  }

  function validationSignUp() {
    setValidation(true);
    if (errors.name) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: errors.name,
      });
      return;
    }

    if (errors.surname) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: errors.surname,
      });
      return;
    }

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

    if (errors.confirm_password) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: errors.confirm_password,
      });
      return;
    }

    if (
      values.name === "" ||
      values.surname === "" ||
      values.email === "" ||
      values.password === "" ||
      values.confirm_password === ""
    ) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Verifique os campos obrigatórios!",
      });
      setValidationName(true);
      setValidationSurname(true);
      setValidationEmail(true);
      setValidationPassword(true);
      setValidationConfirmPassword(true);
      return;
    }

    return true;
  }

  function handleEyePassword() {
    setPasswordEye1(!passwordEye1);
    if (eye1 === "eye") {
      setEye1("eye-slash");
    } else {
      setEye1("eye");
    }
  }

  function handleEyeConfirmPassword() {
    setPasswordEye2(!passwordEye2);
    if (eye2 === "eye") {
      setEye2("eye-slash");
    } else {
      setEye2("eye");
    }
  }

  return (
    <KeyboardAvoidingView style={styles.modalize} behavior="height">
      <TouchableOpacity
        style={styles.btn_close}
        onPress={() => close("sing-up")}>
        <Close name="md-close" color="#FFF" size={20} />
      </TouchableOpacity>
      <View style={styles.content_img_modalize}>
        <Image source={FairIMG} style={styles.hello_img} />
      </View>
      <View style={styles.content_text_inputs_modalize}>
        <SafeAreaView style={{ height: "65%", width: "100%" }}>
          <ScrollView>
            <Text style={styles.text}>Nome</Text>
            <TextInput
              autoComplete="name-given"
              style={
                validation
                  ? errors.name || validationName
                    ? styles.input_error
                    : styles.text_input
                  : styles.text_input
              }
              placeholder="Nome"
              value={values.name}
              onChangeText={(text) => setFieldValue("name", text)}
            />

            <Text style={styles.text}>Sobrenome</Text>
            <TextInput
              autoComplete="name-suffix"
              style={
                validation
                  ? errors.surname || validationSurname
                    ? styles.input_error
                    : styles.text_input
                  : styles.text_input
              }
              placeholder="Sobrenome"
              value={values.surname}
              onChangeText={(text) => setFieldValue("surname", text)}
            />

            <Text style={styles.text}>E-mail</Text>
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

            <View>
              <TouchableOpacity
                style={styles.btn_eye}
                onPress={handleEyePassword}>
                <Eye name={eye1} size={25} color={primaryBlue} />
              </TouchableOpacity>

              <Text style={styles.text}>Senha</Text>
              <TextInput
                autoComplete="password"
                secureTextEntry={passwordEye1}
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

            <View>
              <TouchableOpacity
                style={styles.btn_eye}
                onPress={handleEyeConfirmPassword}>
                <Eye name={eye2} size={25} color={primaryBlue} />
              </TouchableOpacity>

              <Text style={styles.text}>confirmar Senha</Text>
              <TextInput
                autoComplete="password"
                secureTextEntry={passwordEye2}
                style={
                  validation
                    ? errors.confirm_password || validationConfirmPassword
                      ? styles.input_error
                      : styles.text_input
                    : styles.text_input
                }
                placeholder="******"
                value={values.confirm_password}
                onChangeText={(text) => setFieldValue("confirm_password", text)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>

        <TouchableOpacity
          style={[
            styles.btn_sign_up,
            loadingD && {
              backgroundColor: "rgba(101, 108, 186, 0.6)",
              elevation: 0,
            },
          ]}
          onPress={loadingG || loadingD ? null : signUpD}>
          {loadingD ? (
            <ActivityIndicator size="large" color={primaryBlue} />
          ) : (
            <Text style={styles.text_btn_sign_up}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn_sign_up_google,
            loadingG && {
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              elevation: 0,
            },
          ]}
          onPress={loadingG || loadingD ? null : signUpG}>
          {loadingG ? (
            <ActivityIndicator size="large" color={primaryBlue} />
          ) : (
            <>
              <Text style={styles.text_btn_sign_up_google}>
                Cadastrar-se com
              </Text>
              <Image source={GoogleIMG} style={styles.google_img} />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.content_warning}>
          <Text style={styles.text_warning}>Já possiu uma conta?</Text>
          <TouchableOpacity style={styles.btn_sign_in} onPress={closeOpen}>
            <Text style={styles.text_sign_in}>Entrar</Text>
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
    height: "25%",
  },
  hello_img: {
    width: "100%",
    height: "100%",

    resizeMode: "contain",
  },
  content_text_inputs_modalize: {
    width: "100%",
    height: "75%",

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
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignSelf: "center",
    backgroundColor: "#f2f0f0",
  },
  input_error: {
    width: "90%",
    height: 55,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    alignSelf: "center",
    backgroundColor: "#f7d7d9",
  },
  btn_sign_up: {
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
  text_btn_sign_up: {
    fontSize: 18,
    fontFamily: "BowlbyOneSC-Regular",
    color: "#FFF",
  },
  btn_sign_up_google: {
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
  text_btn_sign_up_google: {
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
  btn_sign_in: {
    marginLeft: 5,
  },
  text_sign_in: {
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
