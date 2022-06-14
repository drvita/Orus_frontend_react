import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getListConfig from "./getListConfig";
import getConfig from "./getConfig";
import deleteConfig from "./deleteConfig";
import saveConfig from "./saveConfig";
import getBranches from './getBranches';

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de configuracion");
  yield takeLatest(TYPE.SAGA_GET_LIST_CONFIG, getListConfig);
  yield takeLatest(TYPE.SAGA_GET_CONFIG, getConfig);
  yield takeLatest(TYPE.SAGA_DELETE_CONFIG, deleteConfig);
  yield takeLatest(TYPE.SAGA_SAVE_CONFIG, saveConfig);
  yield takeLatest(TYPE.SAGA_GET_BRANCHES, getBranches);
}
