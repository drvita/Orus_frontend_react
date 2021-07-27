import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { userActions } from "../index";

export default function* handleGetUser({ payload: id }) {
  try {
    const result = yield call(api, `users/${id}`);
    if (result.data) {
      yield put(userActions.setUser(result.data));
    } else {
      console.error("[OrusSystem] Error en handleGetUser", result);
    }
  } catch (e) {
    console.error("[OrusSystem] Error en saga/user handleGetUser:", e.message);
    yield put(userActions.setMessages([]));
  }
}
