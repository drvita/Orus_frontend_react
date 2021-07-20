import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleSaveItem({ payload }) {
  try {
    const { data: DATA = {}, id: ID = null, options: OPT = {} } = payload,
      url = getUrl("store", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) throw new Error(result.message);

    if (ID) console.log("[Orus System] Producto actualizado con exito: " + ID);
    else console.log("[Orus system] Producto creado con exito", result.data.id);

    yield put(
      storeActions.setMessagesStore([
        {
          type: "success",
          text: ID
            ? "Producto actualizado con exito"
            : "Producto almacenado con exito",
        },
      ])
    );
    yield put(storeActions.getListStore(OPT));
  } catch (e) {
    console.error("[Orus System] Error in handleSaveItem", e);
    yield put(
      storeActions.setMessagesStore([
        {
          type: "error",
          text: "al almacenar el producto, intentelo mas tarde",
        },
      ])
    );
  }
}
