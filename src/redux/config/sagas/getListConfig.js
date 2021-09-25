import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { configActions } from "../index";

export default function* handleGetListConfig({ payload: options }) {
  try {
    const url = getUrl("config", null, options),
      result = yield call(api, url);

    if (result.data) {
      yield put(configActions.setListConfig(result));
    } else if (result.message) {
      console.error(
        "[Orus system] Error en la cosnulta de configuraciones",
        result.message
      );
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/config handleGetListConfig:",
      e.message
    );
    yield put(configActions.setMessages([]));
  }
}
