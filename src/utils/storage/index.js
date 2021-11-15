import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageTypes = {
  USER_TYPE: "USER_TYPE",
  WELCOME_TYPE: "WELCOME_TYPE",
  AVATAR_TYPE: "AVATAR_TYPE",
  VIEWED_LIST_TYPE: "VIEWED_LIST_TYPE",
  HISTORIC_TYPE: "HISTORIC_TYPE",
  CATEGORIES_TYPE: "CATEGORIES_TYPE",
  UNITY_TYPE: "UNITY_TYPE",
  PRODUCTS_TYPE: "PRODUCTS_TYPE",
  FOOTER_VISIBLE_TYPE: "FOOTER_VISIBLE_TYPE",
};

export const getStorage = async (type) => {
  try {
    return await AsyncStorage.getItem(type);
  } catch (error) {
    return error;
  }
};

export const setStorage = async (type, data) => {
  try {
    await AsyncStorage.setItem(type, data);
  } catch (error) {
    return error;
  }
};

export const existStorage = async (type) => {
  try {
    let exist = await AsyncStorage.getItem(type);
    if (exist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export const cleanStorage = async (type) => {
  try {
    await AsyncStorage.removeItem(type);
  } catch (error) {
    return error;
  }
};
