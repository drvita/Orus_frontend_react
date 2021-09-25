import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { configActions } from "../index";

export default function* handleSaveConfig({ payload }) {
  try {
    const { data: DATA = {}, id: ID = null, options: OPT = {} } = payload,
      url = getUrl("config", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) throw new Error(result.message);

    if (ID)
      console.log("[Orus System] Configuracion actualizada con exito: " + ID);
    else
      console.log(
        "[Orus system] Configuracion creada con exito",
        result.data.id
      );

    yield put(
      configActions.setMessages([
        {
          type: "success",
          text: ID
            ? "Configuracion actualizada con exito"
            : "Configuracion almacenada con exito",
        },
      ])
    );
    yield put(configActions.getListConfig(OPT));
  } catch (e) {
    console.error(
      "[Orus Server] Error en saga/configuraciones handleSaveConfig",
      e
    );
    yield put(
      configActions.setMessages([
        {
          type: "error",
          text: "al almacenar la configuracion, intentelo mas tarde",
        },
      ])
    );
  }
}
