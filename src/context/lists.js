import React, { createContext, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";

import {
  storageTypes,
  getStorage,
  setStorage,
  cleanStorage,
} from "../utils/storage";

import {
  getProducts,
  addHistoric,
  sortByDate,
  addCategories,
  sortByOnList,
  setStandardStorage,
  updateHistoric,
  deleteHistoric,
} from "./utils";
import { getWelcomeStorage } from "./useStorage";
import {
  addCategoriesFB,
  addHistoricFB,
  createUser,
  deleteHistoricFB,
  getViewedListIDFB,
  getWelcomeFirebase,
  off,
  on,
  updateHistoricFB,
  verifyUser,
} from "./useFIrebase";

const INITIAL_STATE = {
  data: {
    userData: null,
    loading: true,
    drawerSwipe: false,
    welcome: false,
    avatar: "",
    avatars: [],
    viewedListID: "",
    current_list: {},
    historic: [],
    categories: [],
    unitys: [],
    footerVisible: true,
    totalPriceProductCart: 0.0,
  },
  handleWelcomeDone: () => {},
  filterCategories: () => {},
  searchProducts: () => {},
  createNewList: () => {},
  editList: () => {},
  editHistoric: () => {},
  copyList: () => {},
  deleteList: () => {},
  addCategory: () => {},
  addNewProduct: () => {},
  addProductCart: () => {},
  removeProductCart: () => {},
  removeProductList: () => {},
  editProduct: () => {},
  getWelcome: () => {},
  selectList: () => {},
  selectAvatar: () => {},
  googleLogin: () => {},
  defaultLogin: () => {},
  signUpGoogle: () => {},
  signUpDefault: () => {},
  signOut: () => {},
  setFooterVisible: () => {},
  setPriceProductsCart: () => {},
};

export const ListsContext = createContext(INITIAL_STATE);

export const ListsProvider = ({ children }) => {
  const [data, setData] = useState(INITIAL_STATE.data);

  async function setFooterVisible(visible) {
    await setStorage(storageTypes.FOOTER_VISIBLE_TYPE, visible);
    setData({ ...data, footerVisible: visible === "true" });
  }
  function setPriceProductsCart(price) {
    setData({ ...data, totalPriceProductCart: price });
  }

  async function editHistoric(product) {
    let products = data.current_list.productsList;

    products.forEach((prod, index) => {
      if (prod.name === product.name) {
        products[index] = product;
      }
    });

    let newHistoric = {
      ...data.current_list,
      productsList: sortByOnList(products),
    };

    if (data.userData) {
      await updateHistoricFB(data.userData.id, newHistoric);
    } else {
      await updateHistoric(newHistoric);
    }
  }

  async function selectAvatar(url) {
    await setStorage(storageTypes.AVATAR_TYPE, url);

    setData({ ...data, avatar: url });
  }

  async function editProduct(product) {
    let productsList = data.current_list.productsList;

    productsList.forEach((prod, index) => {
      if (prod.name === product.name) {
        productsList[index] = product;
      }
    });

    setData({
      ...data,
      current_list: {
        ...data.current_list,
        productsList: sortByOnList(productsList),
        filterProducts: sortByOnList(productsList),
      },
    });

    editHistoric(product);
  }

  function removeProductList(product) {
    const newProduct = {
      ...product,
      onList: false,
      onCart: false,
    };

    editProduct(newProduct);
  }

  function addProductCart(product) {
    const newProduct = {
      ...product,
      onCart: true,
    };

    editProduct(newProduct);
  }

  function removeProductCart(product) {
    const newProduct = {
      ...product,
      onList: true,
      onCart: false,
    };

    editProduct(newProduct);
  }

  async function addNewProduct(product) {
    let searchValidation = data.current_list.productsList.filter((prod) => {
      return prod.name.toLowerCase() === product.name.toLowerCase();
    });

    if (searchValidation.length) {
      Toast.show({
        type: "error",
        visibilityTime: 5000,
        text2: "Produto já cadastrado!",
      });
    } else {
      let productsList = data.current_list.productsList;

      productsList = [...productsList, product];

      setData({
        ...data,
        current_list: {
          ...data.current_list,
          isNewProduct: null,
          productsList: sortByOnList(productsList),
          filterProducts: sortByOnList(productsList),
        },
      });

      let newHistoric = {
        ...data.current_list,
        productsList: sortByOnList(productsList),
      };

      if (data.userData) {
        await updateHistoricFB(data.userData.id, newHistoric);
      } else {
        await updateHistoric(newHistoric);
      }
    }
  }

  async function addCategory(categoryName) {
    const categoryKey = categoryName.toLowerCase().replace(" ", "_");

    const category = { id: uuid.v4(), label: categoryName, value: categoryKey };

    if (data.userData) {
      await addCategoriesFB(data.userData.id, data.categories, category);
    } else {
      await addCategories(category);
    }

    getWelcome();
  }

  async function createNewList(listData) {
    const listDate = new Date();

    const productsList = sortByOnList(await getProducts());
    await setStorage(storageTypes.VIEWED_LIST_TYPE, listData.id);

    const list = {
      ...listData,
      productsList,
      creationDate: listDate,
    };

    if (data.userData) {
      await addHistoricFB(data.userData.id, list);
    } else {
      await addHistoric(list);
    }

    getWelcome();
  }

  async function editList(newListData, listData) {
    const list = {
      ...listData,
      name: newListData.listName,
      marketName: newListData.marketName,
    };

    if (data.userData) {
      await updateHistoricFB(data.userData.id, list);
    } else {
      await updateHistoric(list);
    }

    getWelcome();
  }

  async function copyList(listData) {
    if (data.userData) {
      await addHistoricFB(data.userData.id, listData);
    } else {
      await addHistoric(listData);
    }

    await setStorage(storageTypes.VIEWED_LIST_TYPE, listData.id);

    getWelcome();
  }

  async function deleteList(listID) {
    if (data.userData) {
      await deleteHistoricFB(data.userData.id, listID);

      getWelcome();
    } else {
      await deleteHistoric(listID);

      const { historic } = JSON.parse(
        await getStorage(storageTypes.HISTORIC_TYPE),
      );

      if (historic.length) {
        await setStorage(storageTypes.VIEWED_LIST_TYPE, historic[0].id);

        getWelcome();
      } else {
        const list = {
          id: "defaultList",
          name: "Minha Lista",
          marketName: "",
        };

        createNewList(list);
      }
    }
  }

  async function selectList(listID) {
    await setStorage(storageTypes.VIEWED_LIST_TYPE, listID);

    getWelcome();
  }

  function searchProducts(value) {
    let status = false;

    let search = data.current_list.productsList.filter((product) => {
      return product.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    if (value !== "") {
      let searchValidation = data.current_list.productsList.filter(
        (product) => {
          return product.name.toLowerCase() === value.toLowerCase();
        },
      );

      if (searchValidation.length) {
        status = false;
      } else {
        status = true;
      }
    }

    setData({
      ...data,
      current_list: {
        ...data.current_list,
        isNewProduct: { name: value, status },
        filterProducts: search,
      },
    });
  }

  function filterCategories(category) {
    let filter = data.current_list.productsList.filter(
      (item) => item.category_key === category,
    );

    if (category === "todas" || !category) {
      setData({
        ...data,
        current_list: {
          ...data.current_list,
          filterProducts: data.current_list.productsList,
        },
      });
    } else {
      setData({
        ...data,
        current_list: { ...data.current_list, filterProducts: filter },
      });
    }
  }

  async function getWelcome() {
    // await cleanStorage(storageTypes.HISTORIC_TYPE);
    // await cleanStorage(storageTypes.WELCOME_TYPE);
    // await cleanStorage(storageTypes.CATEGORIES_TYPE);
    // await cleanStorage(storageTypes.USER_TYPE);

    setData({ ...data, loading: true });

    const welcome = await getStorage(storageTypes.WELCOME_TYPE);
    const footerVisible = await getStorage(storageTypes.FOOTER_VISIBLE_TYPE);

    const user = JSON.parse(await getStorage(storageTypes.USER_TYPE));

    if (welcome) {
      const {
        userData,
        avatar,
        avatars,
        viewedListID,
        categories,
        unitys,
        historic,
        current_list,
      } = user ? await getWelcomeFirebase() : await getWelcomeStorage();

      setData({
        ...data,
        userData,
        loading: false,
        drawerSwipe: true,
        welcome: true,
        avatar,
        avatars,
        viewedListID,
        categories,
        unitys,
        historic,
        current_list,
      });
    } else {
      setData({ ...data, loading: false });
    }
  }

  async function handleWelcomeDone() {
    setData({ ...data, drawerSwipe: true, loading: true });

    await setStandardStorage();

    const list = {
      id: "defaultList",
      name: "Minha Lista",
      marketName: "Nome do Mercado",
    };

    await setStorage(storageTypes.WELCOME_TYPE, "true");
    await setStorage(storageTypes.VIEWED_LIST_TYPE, "defaultList");
    await setStorage(
      storageTypes.AVATAR_TYPE,
      "https://i.imgur.com/SLchjY4.png",
    );

    await createNewList(list);
  }

  async function googleLogin() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { additionalUserInfo, user } = await auth().signInWithCredential(
        googleCredential,
      );

      const userData = {
        id: user.uid,
        name: user.displayName,
        given_name: additionalUserInfo.profile.given_name,
        avatar: user.photoURL,
      };

      await on(userData.id);
      await setStorage(storageTypes.USER_TYPE, JSON.stringify(userData));
      await setStorage(storageTypes.AVATAR_TYPE, userData.avatar);
      await getViewedListIDFB(userData.id);

      return true;
    } catch (error) {
      return false;
    }
  }

  async function defaultLogin(user) {
    try {
      return verifyUser(user);
    } catch (error) {
      return false;
    }
  }

  async function signUpGoogle() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { additionalUserInfo, user } = await auth().signInWithCredential(
        googleCredential,
      );

      const userData = {
        id: user.uid,
        name: user.displayName,
        given_name: additionalUserInfo.profile.given_name,
        avatar: user.photoURL,
        email: user.email,
        provider: "google",
      };

      if (await createUser(userData, "google")) {
        await setStorage(storageTypes.USER_TYPE, JSON.stringify(userData));
        await setStorage(storageTypes.AVATAR_TYPE, userData.avatar);

        getWelcome();

        return true;
      } else {
        await auth().signOut();

        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async function signUpDefault(user) {
    try {
      await auth().createUserWithEmailAndPassword(user.email, user.password);

      const userData = {
        id: uuid.v4(),
        name: `${user.name} ${user.surname}`,
        given_name: user.name,
        avatar: "https://i.imgur.com/SLchjY4.png",
        email: user.email,
        password: user.password,
        provider: "default",
      };

      if (await createUser(userData)) {
        const userD = {
          id: userData.id,
          name: userData.name,
          given_name: userData.given_name,
          avatar: userData.avatar,
          email: userData.email,
          provider: userData.provider,
        };

        await setStorage(storageTypes.USER_TYPE, JSON.stringify(userD));
        await setStorage(storageTypes.AVATAR_TYPE, userD.avatar);

        getWelcome();
      }
      return true;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "error",
          visibilityTime: 5000,
          text2: "Esse e-mail já está sendo usado!",
        });
      }

      return false;
    }
  }

  async function signOut() {
    try {
      await auth().signOut();
      await off(data.userData.id);

      await cleanStorage(storageTypes.USER_TYPE);
      await setStorage(
        storageTypes.AVATAR_TYPE,
        "https://i.imgur.com/SLchjY4.png",
      );
      await setStorage(storageTypes.VIEWED_LIST_TYPE, "defaultList");

      getWelcome();
    } catch (error) {}
  }

  return (
    <ListsContext.Provider
      value={{
        data,
        handleWelcomeDone,
        filterCategories,
        searchProducts,
        createNewList,
        editList,
        editHistoric,
        copyList,
        deleteList,
        addCategory,
        addNewProduct,
        addProductCart,
        removeProductCart,
        removeProductList,
        editProduct,
        getWelcome,
        selectList,
        selectAvatar,
        googleLogin,
        defaultLogin,
        signUpGoogle,
        signUpDefault,
        signOut,
        setFooterVisible,
        setPriceProductsCart,
      }}>
      {children}
    </ListsContext.Provider>
  );
};
