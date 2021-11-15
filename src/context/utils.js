import uuid from "react-native-uuid";
import {
  storageTypes,
  getStorage,
  existStorage,
  setStorage,
  cleanStorage,
} from "../utils/storage";

import { categories as CategoriesList } from "../utils/json/categories.json";
import { products as ProductsList } from "../utils/json/products.json";
import { unitys as UnitysList } from "../utils/json/unity.json";

export const setStandardStorage = async () => {
  const categories = [];
  const unitys = [];

  Object.entries(CategoriesList).forEach(([key, value]) => {
    const id = uuid.v4();
    categories.push({ id, label: value, value: key });
  });

  UnitysList.forEach((value) => {
    unitys.push({ id: uuid.v4(), label: value, value: value });
  });

  await setStorage(storageTypes.PRODUCTS_TYPE, JSON.stringify(ProductsList));
  await setStorage(storageTypes.UNITY_TYPE, JSON.stringify(unitys));
  await setStorage(storageTypes.CATEGORIES_TYPE, JSON.stringify(categories));
};

export const clearStorage = async () => {
  const list = {
    id: "defaultList",
    name: "Minha Lista",
    marketName: "",
    productsList: ProductsList,
    creationDate: new Date(),
  };

  await cleanStorage(storageTypes.HISTORIC_TYPE);
  await addHistoric(list);
};

export const getCategories = async () => {
  return JSON.parse(await getStorage(storageTypes.CATEGORIES_TYPE));
};

export const getUnitys = async () => {
  return JSON.parse(await getStorage(storageTypes.UNITY_TYPE));
};

export const getProducts = async () => {
  return JSON.parse(await getStorage(storageTypes.PRODUCTS_TYPE));
};

export const addCategories = async (category) => {
  const categories = JSON.parse(await getStorage(storageTypes.CATEGORIES_TYPE));

  const add = [...categories, category];
  await setStorage(storageTypes.CATEGORIES_TYPE, JSON.stringify(add));
};

export const addHistoric = async (newList) => {
  const existHistoricStorage = await existStorage(storageTypes.HISTORIC_TYPE);

  if (existHistoricStorage) {
    const { historic } = JSON.parse(
      await getStorage(storageTypes.HISTORIC_TYPE),
    );

    const newHistoric = { historic: [newList, ...historic] };
    await setStorage(storageTypes.HISTORIC_TYPE, JSON.stringify(newHistoric));
  } else {
    await setStorage(
      storageTypes.HISTORIC_TYPE,
      JSON.stringify({ historic: [newList] }),
    );
  }
};

export const updateHistoric = async (listData) => {
  const { historic } = JSON.parse(await getStorage(storageTypes.HISTORIC_TYPE));

  const saveList = {
    ...listData,
    filterProducts: [],
  };

  historic.forEach((list, index) => {
    if (list.id === saveList.id) {
      historic[index] = saveList;
    }
  });

  const newHistoric = { historic: historic };

  await setStorage(storageTypes.HISTORIC_TYPE, JSON.stringify(newHistoric));
};

export const deleteHistoric = async (listID) => {
  const { historic } = JSON.parse(await getStorage(storageTypes.HISTORIC_TYPE));

  historic.forEach((list, index) => {
    if (list.id === listID) {
      historic.splice(index, 1);
    }
  });

  const newHistoric = { historic: historic };

  await setStorage(storageTypes.HISTORIC_TYPE, JSON.stringify(newHistoric));
};

export const findHistoric = async (listID) => {
  const { historic } = JSON.parse(await getStorage(storageTypes.HISTORIC_TYPE));

  let locatedList = {};

  historic.forEach((list) => {
    if (list.id === listID) {
      locatedList = list;
    }
  });

  return locatedList;
};

export const sortByDate = (array) => {
  function compare(x, y) {
    let date1 = new Date(x.creationDate);
    let date2 = new Date(y.creationDate);
    return date2 - date1;
  }

  return array.sort(compare);
};

export const sortByOnList = (array) => {
  function compare(x, y) {
    if (x.onList.toString() > y.onList.toString()) {
      return -1;
    }
  }

  return array.sort(compare);
};

export const formattedCurrentList = (list, categories) => {
  const { id, name, marketName } = list;

  let productsTemp = [];

  Object.entries(categories).forEach(([key, value]) => {
    productsTemp.push({
      id: key,
      title: value,
      products: [],
    });
  });

  let current_list = {
    id,
    name,
    marketName,
    products: productsTemp,
  };

  return current_list;
};
