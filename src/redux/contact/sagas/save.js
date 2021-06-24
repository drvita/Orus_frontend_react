import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { contactActions } from "../.";

export default function* handleSaveContact({ payload }) {
  try {
    const { data = {}, id: ID = null, options: OPT = {} } = payload,
      url = getUrl("contacts", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, data);

    if (result.message) throw new Error(result.message);

    if (ID) console.log("[Orus System] Contacto actualizado con exito", ID);
    else console.log("[Orus system] Contacto creado con exito", result.data.id);

    //localStorage.setItem("OrusContactInUse", JSON.stringify({}));

    yield put(
      contactActions.setMessageContact([
        {
          type: "success",
          text: ID
            ? "Contacto actualizado con exito"
            : "Contacto almacenado con exito",
        },
      ])
    );
    yield put(contactActions.getListContact(OPT));
  } catch (e) {
    console.error("[Orus System] Error in handle save contact", e);
    yield put(
      contactActions.setMessageContact([
        {
          type: "error",
          text: "al almacenar el contacto, intentelo mas tarde",
        },
      ])
    );
  }
}
