import React, { useContext } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../pages/App/Home";
import { ProductsList } from "../pages/App/ProductsList";
import { Historic } from "../pages/App/Historic";
import { Categories } from "../pages/App/Categories";
import { Product } from "../pages/App/Product";

import { CustomDrawer } from "./CustomDrawer";

import { primaryBlue } from "../global/styles";
import { ListsContext } from "../context/lists";
import { Login } from "../pages/App/Login";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Products"
        component={ProductsList}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditItem"
        component={Product}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Historic"
        component={Historic}
        options={{
          headerTitle: "Suas Listas",
          headerStyle: {
            backgroundColor: primaryBlue,
            elevation: 0,
          },
          headerTintColor: "#FFF",
          headerTitleStyle: "#FFF",
        }}
      />

      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerTitle: "Categorias",
          headerStyle: {
            backgroundColor: primaryBlue,
            elevation: 0,
          },
          headerTintColor: "#FFF",
          headerTitleStyle: "#FFF",
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const DrawerMenu = () => {
  const {
    data: { drawerSwipe },
  } = useContext(ListsContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        swipeEnabled: drawerSwipe,
      }}>
      <Drawer.Screen
        name="Routes"
        component={Routes}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
