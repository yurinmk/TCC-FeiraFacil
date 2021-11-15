import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Error from "react-native-vector-icons/dist/FontAwesome";

import { ListsProvider } from "./context/lists";
import { DrawerMenu } from "./routes";
import { BackgroundApp, primaryRed } from "./global/styles";

const toastConfig = {
  error: ({ text2, props, ...rest }) => (
    <View style={styles.toast_container}>
      <View style={styles.toast_status}></View>

      <View style={styles.toast_content}>
        <View style={styles.toast_icon}>
          <Error name="close" size={20} color={primaryRed} />
        </View>

        <Text style={styles.toast_text}>{text2}</Text>
      </View>
    </View>
  ),
};

export default function App() {
  return (
    <NavigationContainer>
      <ListsProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#85F0FF" barStyle="dark-content" />
          <DrawerMenu />
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </ListsProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundApp,
  },
  toast_container: {
    minHeight: 60,
    width: "90%",
    backgroundColor: "tomato",

    borderRadius: 15,

    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  toast_status: {
    width: "2%",
    height: "100%",

    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,

    backgroundColor: primaryRed,
  },
  toast_content: {
    width: "98%",
    height: "100%",
    padding: 10,

    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    backgroundColor: "#fcfcfc",
  },
  toast_icon: {
    width: 30,
    height: 30,

    borderRadius: 30 / 2,
    borderWidth: 2,

    alignItems: "center",
    justifyContent: "center",

    borderColor: primaryRed,
  },
  toast_text: {
    fontSize: 17,
    fontWeight: "400",
    paddingLeft: 10,
  },
});
