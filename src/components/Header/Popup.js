import React, { useRef, useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuItem,
  MenuDivider,
  Position,
} from "react-native-enhanced-popup-menu";
import DotsIcon from "react-native-vector-icons/dist/Entypo";
import { ListsContext } from "../../context/lists";

import { primaryBlue } from "../../global/styles";
import { useModal } from "../../hooks/Modal";
import { ListFrom } from "./ListFrom";

const ElementToStick = React.forwardRef(({ style }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        {
          borderColor: primaryBlue,
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}>
      <DotsIcon name="dots-three-vertical" size={30} color="#FFF" />
    </View>
  );
});

export const Popup = () => {
  const elementRef = React.createRef();
  const menuRef = useRef(Menu);

  const { data } = useContext(ListsContext);

  const { ModalComponet, show } = useModal();
  const [typeList, setTypeList] = useState("");
  const [list, setList] = useState();

  const hideMenu = () => menuRef?.current.hide();
  const showMenu = () => {
    menuRef?.current.show(elementRef.current, Position.TOP_LEFT);
  };

  const onPress = () => showMenu();

  const openNewListModal = (type) => {
    show();
    hideMenu();
    setTypeList(type);
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <ElementToStick ref={elementRef} />
      </TouchableOpacity>

      <Menu ref={menuRef}>
        <MenuItem
          onPress={() => {
            setList(data.current_list);
            openNewListModal("copy");
          }}>
          Copiar Lista
        </MenuItem>
        <MenuItem onPress={() => openNewListModal("create")}>
          Criar Nova Lista
        </MenuItem>
        <MenuItem onPress={hideMenu}>Riscar Todos os Itens</MenuItem>
        <MenuItem onPress={hideMenu}>Excluir Itens Riscados</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Avaliar</MenuItem>
      </Menu>

      <ModalComponet>
        <ListFrom type={typeList} close={show} additionalData={list} />
      </ModalComponet>
    </>
  );
};

const styles = StyleSheet.create({
  container_btn_dots: {
    width: "10%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
