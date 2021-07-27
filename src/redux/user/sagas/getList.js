import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { userActions } from "../index";

export default function* handleGetList({ payload: options }) {
  try {
    const url = getUrl("users", null, options),
      result = yield call(api, url);

    if (result.data) {
      yield put(userActions.setListUsers(result));
    } else if (result.message) {
      console.error(
        "[Orus system] Error en la cosnulta de usuarios",
        result.message
      );
      window.sendPushMessage("Orus System", result.message);
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/users handleGetList:",
      e.message
    );
    yield put(userActions.setMessages([]));
  }
}
