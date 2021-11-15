import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Confirm from "react-native-vector-icons/dist/Entypo";

import { ListsContext } from "../../../context/lists";
import { primaryRed } from "../../../global/styles";

export const AddCategory = ({ close }) => {
  const { addCategory } = useContext(ListsContext);

  const [validation, setValidation] = useState(false);

  const { errors, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      categoryName: "",
    },
    onSubmit: () => {
      if (values.categoryName === "") {
        setValidation(true);
        Toast.show({
          type: "error",
          visibilityTime: 5000,
          text2: "Nome da categoria é obrigatório!",
        });
      } else {
        addCategory(values.categoryName);
        setValidation(false);
        close();
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={validation ? styles.input_error : styles.input}
        placeholder="Nome da Categoria"
        value={values.categoryName}
        onChangeText={(text) => setFieldValue("categoryName", text)}
      />

      <TouchableOpacity style={styles.btn_confirm} onPress={handleSubmit}>
        <Confirm name="check" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    height: 50,
    padding: 10,
    marginTop: 20,
    fontSize: 18,

    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#000",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFF",
  },
  input_error: {
    width: "70%",
    height: 50,
    padding: 10,
    marginTop: 20,
    fontSize: 18,

    borderWidth: 2,
    borderRadius: 15,
    borderColor: primaryRed,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f7d7d9",
  },
  btn_confirm: {
    width: "70%",
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#2ED453",
  },
});
