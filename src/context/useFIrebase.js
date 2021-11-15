import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";

import { products } from "../utils/json/products.json";
import { categories as categoriesJSON } from "../utils/json/categories.json";
import { unitys as unityJSON } from "../utils/json/unity.json";
import { avatars } from "../utils/json/avatars.json";
import { getStorage, setStorage, storageTypes } from "../utils/storage";
import { clearStorage, findHistoric, sortByDate, sortByOnList } from "./utils";

export const getWelcomeFirebase = async () => {
  const userData = JSON.parse(await getStorage(storageTypes.USER_TYPE));
  const avatarsList =
    userData.provider === "default" ? avatars : [userData.avatar, ...avatars];

  await setStorage(storageTypes.AVATAR_TYPE, userData.avatar);

  const { _data } = await firestore()
    .collection("users")
    .doc(userData.id)
    .get();

  const historic = sortByDate(_data.historic);
  const filterProducts = sortByOnList(historic[0].productsList);
  const viewedListID = await getStorage(storageTypes.VIEWED_LIST_TYPE);
  const viewedList = await findHistoricFB(_data.historic, viewedListID);

  const dataObject = {
    userData,
    avatar: userData.avatar,
    avatars: avatarsList,
    viewedListID,
    categories: _data.categories,
    unitys: _data.unitys,
    historic,
    current_list: { ...viewedList, filterProducts },
  };

  return dataObject;
};

export const findHistoricFB = async (historic, listID) => {
  let locatedList = {};

  historic.forEach((list) => {
    if (list.id === listID) {
      locatedList = list;
    }
  });

  return locatedList;
};

export const addHistoricFB = async (docID, listData) => {
  const { _data } = await firestore().collection("users").doc(docID).get();

  const historic = sortByDate(
    JSON.parse(JSON.stringify([..._data.historic, listData])),
  );

  await firestore()
    .collection("users")
    .doc(docID)
    .update({ historic })
    .then(() => {})
    .catch(() => {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Algo deu errado.",
      });
    });
};

export const updateHistoricFB = async (docID, listData) => {
  const { _data } = await firestore().collection("users").doc(docID).get();

  const historic = sortByDate(_data.historic);
  const { creationDate, id, marketName, name, productsList } = listData;

  const saveList = {
    creationDate,
    id,
    marketName,
    name,
    filterProducts: [],
    productsList,
  };

  historic.forEach((list, index) => {
    if (list.id === saveList.id) {
      historic[index] = saveList;
    }
  });

  await firestore()
    .collection("users")
    .doc(docID)
    .update({ historic })
    .then(() => {})
    .catch(() => {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Algo deu errado.",
      });
    });
};

export const deleteHistoricFB = async (docID, listID) => {
  const { _data } = await firestore().collection("users").doc(docID).get();

  const historic = _data.historic;

  historic.forEach((list, index) => {
    if (list.id === listID) {
      historic.splice(index, 1);
    }
  });

  if (historic.length) {
    const newHistoric = sortByDate(historic);

    await setStorage(storageTypes.VIEWED_LIST_TYPE, newHistoric[0].id);

    await firestore()
      .collection("users")
      .doc(docID)
      .update({ historic: newHistoric })
      .then(() => {})
      .catch(() => {
        Toast.show({
          type: "error",
          visibilityTime: 5000,
          text2: "Algo deu errado.",
        });
      });
  } else {
    const list = {
      id: "defaultList",
      name: "Minha Lista",
      marketName: "Nome do Mercado",
      productsList: products,
      creationDate: new Date(),
    };

    await setStorage(storageTypes.VIEWED_LIST_TYPE, list.id);

    const historic = JSON.parse(JSON.stringify([list]));

    await firestore()
      .collection("users")
      .doc(docID)
      .update({ historic })
      .then(() => {})
      .catch(() => {
        Toast.show({
          type: "error",
          visibilityTime: 5000,
          text2: "Algo deu errado.",
        });
      });
  }
};

export const addCategoriesFB = async (docID, categories, category) => {
  const newCategories = [...categories, category];
  await firestore()
    .collection("users")
    .doc(docID)
    .update({ categories: newCategories })
    .then(() => {})
    .catch(() => {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Algo deu errado, tente novamente!",
      });
    });
};

export const getViewedListIDFB = async (docID) => {
  const { _data } = await firestore().collection("users").doc(docID).get();

  const historic = sortByDate(_data.historic);

  await setStorage(storageTypes.VIEWED_LIST_TYPE, historic[0].id);
};

export const createInitialDoc = async (userDoc) => {
  try {
    let categories = [];
    let unitys = [];

    const { historic } = JSON.parse(
      await getStorage(storageTypes.HISTORIC_TYPE),
    );
    const formattedHistoric = sortByDate(historic);

    Object.entries(categoriesJSON).forEach(([key, value]) => {
      let id = uuid.v4();
      categories.push({ id, label: value, value: key });
    });

    unityJSON.forEach((unity) => {
      let id = uuid.v4();
      unitys.push({ id, label: unity, value: unity });
    });

    firestore()
      .collection("users")
      .doc(userDoc)
      .update({ categories, unitys, historic: formattedHistoric, online: true })
      .then(() => {});

    return true;
  } catch (error) {
    return false;
  }
};

export const createUser = async (user, type) => {
  try {
    let userExist = false;
    const { docs } = await firestore().collection("users").get();

    docs.forEach((docUser) => {
      if (docUser.id === user.id) {
        Toast.show({
          type: "error",
          visibilityTime: 5000,
          text2: "Usúario já existente!",
        });
        userExist = true;
        return;
      }
    });

    if (!userExist) {
      await firestore().collection("users").doc(user.id).set(user);
      await createInitialDoc(user.id);
      await clearStorage();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const verifyUser = async (user) => {
  try {
    let error = false;
    let message = "";
    let success = false;
    const { docs } = await firestore().collection("users").get();

    docs.forEach((docUser) => {
      if (docUser._data.email === user.email) {
        if (docUser._data.provider === "google") {
          error = true;
          message = "E-mail inválido!";
          return;
        }
        if (docUser._data.password !== user.password) {
          error = true;
          message = "Senha inválida!";
          return;
        }
        if (docUser._data.online) {
          error = true;
          message = "A conta já encontra-se logada!";
          return;
        }
        if (docUser._data.password === user.password) {
          success = true;
          return;
        }
      }
    });

    if (error || !success) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: message ? message : "E-mail inválido!",
      });
      return false;
    }
    if (success) {
      return true;
    }
  } catch (error) {
    Toast.show({
      type: "error",
      visibilityTime: 5000,
      text2: error.code,
    });
  }
};

export const off = async (ususerIder) => {
  await firestore()
    .collection("users")
    .doc(ususerIder)
    .update({ online: false });
};

export const on = async (ususerIder) => {
  await firestore()
    .collection("users")
    .doc(ususerIder)
    .update({ online: true });
};
