import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { configActions } from "../index";

export default function* handledDeleteConfig({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = `config/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Configuracion eliminada con exito", ID);
      yield put(
        configActions.setMessages([
          {
            type: "success",
            text: "Configuracion eliminada con exito",
          },
        ])
      );
      yield put(configActions.getListConfig(options));
    } else {
      console.error(
        "[Orus Server] Fallo al eliminar configuracion",
        result.message
      );
    }
  } catch (e) {
    console.error(
      "[Orus Server] Error en saga/configuraciones handledDeleteConfig",
      e.message
    );
    yield put(
      configActions.setMessages([
        {
          type: "error",
          text: "al eliminar la configuracion, intentelo mas tarde",
        },
      ])
    );
  }
}
