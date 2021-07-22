import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleSaveBrand({ payload }) {
  try {
    const { data: DATA = {}, id: ID = null, options: OPT = {} } = payload,
      url = getUrl("brands", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) throw new Error(result.message);

    if (ID) console.log("[Orus System] Marca actualizada con exito: " + ID);
    else console.log("[Orus system] Marca creada con exito", result.data.id);

    yield put(
      storeActions.setMessagesStore([
        {
          type: "success",
          text: ID
            ? "Marca actualizada con exito"
            : "Marca almacenada con exito",
        },
      ])
    );
    yield put(storeActions.getListBrands(OPT));
  } catch (e) {
    console.error("[Orus System] Error saga handleSaveBrand", e);
    yield put(
      storeActions.setMessagesStore([
        {
          type: "error",
          text: "al almacenar la marca, intentelo mas tarde",
        },
      ])
    );
  }
}
