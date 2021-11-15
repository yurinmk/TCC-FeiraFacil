import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Edit from "react-native-vector-icons/dist/Entypo";
import Delete from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Copy from "react-native-vector-icons/dist/Ionicons";

import { ListsContext } from "../../../context/lists";
import { formatDate } from "../../../utils/helpers";
import { BackgroundApp, primaryBlue } from "../../../global/styles";
import { useModal } from "../../../hooks/Modal";
import { ListFrom } from "../../../components/Header/ListFrom";
import { Loading } from "../../../components/Loading";

export const Historic = () => {
  const {
    data: { historic, loading },
    selectList,
    deleteList,
    getWelcome,
  } = useContext(ListsContext);
  const navigation = useNavigation();

  const { ModalComponet, show } = useModal();

  const [typeList, setTypeList] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    getWelcome();
  }, []);

  function openModal(type, listData) {
    setTypeList(type);
    setList(listData);
    show();
  }

  function LeftActions(listData) {
    return (
      <View style={styles.container_interaction}>
        <View style={styles.container_btns}>
          <TouchableOpacity onPress={() => openModal("edit", listData)}>
            <Edit name="edit" size={30} color={primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("🤦‍♂️ Ops!", "Deseja realmente deletar a lista?", [
                { text: "cancelar" },
                { text: "sim", onPress: () => deleteList(listData.id) },
              ])
            }>
            <Delete name="delete-forever" size={30} color={primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal("copy", listData)}>
            <Copy name="copy" size={30} color={primaryBlue} />
          </TouchableOpacity>
        </View>

        <ModalComponet>
          <ListFrom type={typeList} close={show} additionalData={list} />
        </ModalComponet>
      </View>
    );
  }

  function handleSelectList(listID) {
    selectList(listID);
    navigation.navigate("Home");
  }

  function HistoricItem({ item }) {
    let quantityItemsList = 0;
    let quantityItemsCart = 0;

    item.productsList.forEach((prod) => {
      if (prod.onList) {
        quantityItemsList++;
      }
      if (prod.onCart) {
        quantityItemsCart++;
      }
    });

    return (
      <Swipeable renderLeftActions={() => LeftActions(item)}>
        <TouchableOpacity
          style={styles.container_item}
          onPress={() => handleSelectList(item.id)}>
          <View style={styles.container_title}>
            <View style={styles.content_title}>
              <Text style={styles.txt_title}>{item.name}</Text>
              <Text style={styles.txt_title}>
                ({quantityItemsList}/{quantityItemsCart})
              </Text>
            </View>
            <View style={styles.content_date}>
              <Text style={styles.txt_date}>
                {formatDate(item.creationDate)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={historic}
          keyExtractor={(item) => item.id}
          renderItem={HistoricItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: BackgroundApp,
  },
  container_item: {
    width: "95%",
    height: 70,
    marginTop: 10,
    marginBottom: 5,

    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    backgroundColor: "#fefefe",
  },
  container_interaction: {
    width: "30%",
    height: 70,
    marginTop: 10,
    marginBottom: 5,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: primaryBlue,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    backgroundColor: "#fefefe",
  },
  container_title: {
    width: "100%",
    height: "100%",
    borderRadius: 15,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content_title: {
    width: "70%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  txt_title: {
    fontSize: 16,
    paddingLeft: 10,
  },
  txt_date: {
    fontSize: 16,
    paddingTop: 5,
  },
  content_date: {
    width: "30%",
    height: "100%",

    display: "flex",
    alignItems: "center",
  },
  container_btns: {
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
