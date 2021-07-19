import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleGetItem({ payload: id }) {
  try {
    const result = yield call(api, `store/${id}`);
    if (result.data) {
      yield put(storeActions.setItem(result.data));
    } else {
      console.error("[OrusSystem] Error en handleGetItem", result);
    }
  } catch (e) {
    console.error("[OrusSystem] Error en saga/order handleGetItem:", e);
    yield put(storeActions.setMessagesStore([]));
  }
}
