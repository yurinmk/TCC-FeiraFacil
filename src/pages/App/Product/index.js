import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFormik } from "formik";
import { useNavigation, StackActions } from "@react-navigation/core";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CarShop from "react-native-vector-icons/dist/FontAwesome5";
import Confirm from "react-native-vector-icons/dist/Entypo";
import Toast from "react-native-toast-message";

import { ListsContext } from "../../../context/lists";
import {
  BackgroundApp,
  primaryBlue,
  primaryGreen,
  primaryRed,
} from "../../../global/styles";
import { DropDown } from "../../../components/DropDown";
import { formatCurrency, formatOnlyNumber } from "../../../utils/helpers";

import formVatidation from "./validation";

export const Product = ({ route }) => {
  const { product, type } = route.params;
  const navigation = useNavigation();

  const {
    data: { unitys, categories },
    editProduct,
    addNewProduct,
  } = useContext(ListsContext);

  const [validation, setValidation] = useState(false);
  const [ddCategories] = useState(
    categories.filter((category) => category.value !== "todas"),
  );

  const { errors, values, setFieldValue } = useFormik({
    initialValues: {
      name: product.name,
      img_url: product.img_url,
      quantity: product.quantity.toString(),
      unity: product.unity,
      price: product.price.toString(),
      onCart: product.onCart,
      onList: product.onList,
      category_key: product.category_key,
      category_name: product.category_name,
    },
    validationSchema: formVatidation,
  });

  function goHome() {
    navigation.dispatch(StackActions.pop(1));
  }

  function onChangeUnity(value) {
    setFieldValue("unity", value);
  }

  function onChangeCategory(value) {
    setFieldValue("category_key", value);
  }

  function handleEdit() {
    setValidation(true);
    if (errors.name || errors.price || errors.quantity) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Verifique o(s) campo(s) obrigatório(s)!",
      });
    } else {
      if (values.name !== product.name) {
        const product = {
          ...values,
          onList: true,
        };
        addNewProduct(product);
        goHome();
      } else {
        const product = {
          ...values,
          onList: true,
        };
        if (type === "newProd") {
          addNewProduct(product);
        } else {
          editProduct(product);
        }
        goHome();
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_txt_input}>
        <View style={styles.container_input1}>
          <Text style={styles.txt}>Nome</Text>
          <TextInput
            style={
              validation && errors.name
                ? styles.input_error1
                : styles.input_name
            }
            onChangeText={(text) => setFieldValue("name", text)}
            value={values.name}
            placeholder="Nome do producto"
          />
        </View>
      </View>

      <View style={styles.container_txt_inputs}>
        <View style={styles.container_input2}>
          <Text style={styles.txt}>Quantidade</Text>
          <TextInput
            style={
              validation && errors.quantity
                ? styles.input_error2
                : styles.input_quatity
            }
            onChangeText={(text) =>
              setFieldValue("quantity", formatOnlyNumber(text))
            }
            value={formatOnlyNumber(values.quantity)}
            placeholder="1"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.container_dropdown_unity}>
          <Text style={styles.txt}>Unidade</Text>
          <DropDown
            items={unitys}
            placeholder="Selecionar..."
            onChange={onChangeUnity}
            defaultValue={values.unity}
          />
        </View>
      </View>

      <View style={styles.container_txt_inputs}>
        <View style={styles.container_input2}>
          <Text style={styles.txt}>Valor</Text>
          <TextInput
            style={
              validation && errors.price
                ? styles.input_error2
                : styles.input_price
            }
            onChangeText={(text) =>
              setFieldValue("price", formatCurrency(text))
            }
            value={formatCurrency(values.price)}
            placeholder="0.0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.container_onCrat}>
          <CarShop name="cart-plus" size={30} color={primaryBlue} />
          <BouncyCheckbox
            size={25}
            fillColor={primaryGreen}
            iconStyle={{
              borderColor: primaryBlue,
              borderWidth: 2,
              marginLeft: 15,
            }}
            isChecked={values.onCart}
            onPress={(isChecked) => setFieldValue("onCart", isChecked)}
          />
        </View>
      </View>

      <View style={styles.container_dropdown_categories}>
        <Text style={styles.txt}>Categorias</Text>
        <DropDown
          items={ddCategories}
          placeholder="Selecionar..."
          onChange={onChangeCategory}
          defaultValue={values.category_key}
        />
      </View>

      <TouchableOpacity style={styles.bnt_confirm} onPress={handleEdit}>
        <Confirm name="check" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",

    backgroundColor: BackgroundApp,
  },
  container_txt_input: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  container_input1: {
    width: "90%",
  },
  txt: {
    fontSize: 16,
    textAlign: "left",
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input_name: {
    width: "100%",
    height: 60,

    borderColor: primaryBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fff",
  },

  input_error1: {
    width: "100%",
    height: 60,

    borderColor: primaryBlue,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: primaryRed,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#f7d7d9",
  },
  input_error2: {
    width: "100%",
    height: 60,

    borderColor: primaryBlue,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: primaryRed,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#f7d7d9",
  },
  container_txt_inputs: {
    width: "90%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input_quatity: {
    width: "100%",
    height: 60,

    borderColor: primaryBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fff",
  },
  container_dropdown_unity: {
    width: "45%",
  },
  container_input2: {
    width: "45%",
  },
  input_price: {
    width: "100%",
    height: 60,

    borderColor: primaryBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fff",
  },
  container_onCrat: {
    width: "45%",
    height: 60,
    marginTop: 50,

    borderColor: primaryBlue,
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: "#fff",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container_dropdown_categories: {
    width: "90%",
    marginTop: 10,
  },
  bnt_confirm: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    marginBottom: 20,

    bottom: 0,
    position: "absolute",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: primaryBlue,
  },
});
