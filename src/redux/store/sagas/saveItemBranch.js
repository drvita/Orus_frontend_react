import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleSaveItemInBranch({ payload }) {
  try {
    const { data: DATA = {}, id: ID = null } = payload,
      url = getUrl("branches", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) {
      throw new Error(result.message);
    }

    if (ID) console.log("[Orus System] Productos actualizados con exito " + ID);
    else console.log("[Orus system] Productos creados con exito");

    yield put(
      storeActions.setMessagesStore([
        {
          type: "success",
          text: ID
            ? "Productos actualizados con exito"
            : "Productos almacenados con exito",
        },
      ])
    );
    yield put(storeActions.getItem(DATA.store_item_id));
  } catch (e) {
    console.error(
      "[Orus System] Error en saga handleSaveItemInBranch",
      e.message
    );
    yield put(
      storeActions.setMessagesStore([
        {
          type: "error",
          text: "al almacenar los productos en el almacen correspondiente",
        },
      ])
    );
  }
}
