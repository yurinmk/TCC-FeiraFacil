import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { primaryBlue } from "../global/styles";

export const useDropDown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [placeholder, setPlaceholder] = useState("");

  function DropDown() {
    return (
      <>
        <DropDownPicker
          open={open}
          placeholder={placeholder}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropdown}
          containerStyle={{
            width: "100%",
          }}
          dropDownContainerStyle={{
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
          }}
        />
      </>
    );
  }

  return {
    DropDown,
    value,
    setValue: (value) => setValue(value),
    setPlaceholder: (value) => setPlaceholder(value),
    setItems: (item) => setItems(item),
  };
};

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 60,

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    zIndex: -1,

    borderWidth: 1,
    borderColor: primaryBlue,
  },
});
