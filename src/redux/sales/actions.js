import { TYPE } from "./types";

const setListSales = (payload = {}) => ({
  type: TYPE.SET_LIST_SALES,
  payload,
});
const setMessagesSale = (payload = []) => ({
  type: TYPE.SET_MESSAGE_SALE,
  payload,
});
const setSale = (payload = {}) => ({
  type: TYPE.SET_SALE,
  payload,
});
const setListBanks = (payload = {}) => ({
  type: TYPE.SET_LIST_BANKS,
  payload,
});

//SAGAS
const getListSale = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_SALES,
  payload,
});
const getSale = (payload) => ({
  type: TYPE.SAGA_GET_SALE,
  payload,
});
const deleteSale = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_SALE,
  payload,
});
const saveSale = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_SALE,
  payload,
});
const getListBanks = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_BANK,
  payload,
});

const toExportActions = {
  setListSales,
  setMessagesSale,
  saveSale,
  setSale,
  getListSale,
  getSale,
  deleteSale,
  getListBanks,
  setListBanks,
};

export default toExportActions;
