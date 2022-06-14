import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { orderActions } from "../.";

export default function* handleGetOrder({ payload: id }) {
  try {
    const result = yield call(api, `orders/${id}`);
    if (result.data) {
      console.log("[Orus System] Orden:", result.data.id);
      yield put(orderActions.setOrder(result.data));
    } else {
      console.error("[Orus System] Error en handleGetOrder", result);
    }
  } catch (e) {
    console.error("[Orus System] Error en saga/order handleGetOrder:", e);
    yield put(orderActions.setMessageOrder([]));
  }
}
