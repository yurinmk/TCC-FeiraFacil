import React, { useContext } from "react";
import uuid from "react-native-uuid";
import { useFormik } from "formik";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Confirm from "react-native-vector-icons/dist/Entypo";

import { ListsContext } from "../../context/lists";
import { primaryGreen } from "../../global/styles";

export const ListFrom = ({ type, close, additionalData }) => {
  const { createNewList, editList, copyList } = useContext(ListsContext);
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      listName: additionalData ? additionalData.name : "",
      marketName: additionalData ? additionalData.marketName : "",
    },
    onSubmit: (values) => {
      submit(type, values);
    },
  });

  function submit(type, values) {
    switch (type) {
      case "edit":
        editList(values, additionalData);
        close();

        break;
      case "copy":
        const listDate = new Date();

        const copy = {
          ...additionalData,
          id: uuid.v4(),
          name: values.listName,
          marketName: values.marketName,
          creationDate: listDate,
        };

        copyList(copy);
        close();

        break;

      default:
        const list = {
          id: uuid.v4(),
          name: values.listName,
          marketName: values.marketName,
        };

        createNewList(list);
        close();

        break;
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da Lista"
        value={values.listName}
        onChangeText={handleChange("listName")}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome do mercado"
        value={values.marketName}
        onChangeText={handleChange("marketName")}
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

    backgroundColor: primaryGreen,
  },
});
