import { getStorage, setStorage, storageTypes } from "../utils/storage";
import { avatars } from "../utils/json/avatars.json";
import {
  findHistoric,
  getCategories,
  getUnitys,
  sortByDate,
  sortByOnList,
} from "./utils";

export const getWelcomeStorage = async () => {
  const userData = JSON.parse(await getStorage(storageTypes.USER_TYPE));

  const avatar = await getStorage(storageTypes.AVATAR_TYPE);
  let avatarsList = avatars;

  const { historic } = JSON.parse(await getStorage(storageTypes.HISTORIC_TYPE));
  const formattedHistoric = sortByDate(historic);

  const viewedListID = await getStorage(storageTypes.VIEWED_LIST_TYPE);
  const viewedList = await findHistoric(viewedListID);

  const categories = await getCategories();
  const unitys = await getUnitys();
  const filterProducts = sortByOnList(formattedHistoric[0].productsList);

  if (userData) {
    avatarsList = [userData.avatar, ...avatars];
    if (!avatar) {
      await setStorage(storageTypes.AVATAR_TYPE, userData.avatar);
    }
  }

  const dataObject = {
    userData,
    avatar,
    avatars: avatarsList,
    viewedListID,
    categories,
    unitys,
    historic: formattedHistoric,
    current_list: { ...viewedList, filterProducts },
  };

  return dataObject;
};
