import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { orderActions } from "../.";

export default function* handleGetList({ payload }) {
  try {
    const url = getUrl("orders", null, payload),
      result = yield call(api, url);
    yield put(
      orderActions.setListOrder({
        result: {
          list: result.data,
          metaList: result.meta,
        },
      })
    );
  } catch (e) {
    console.error("[Orus System] Error en saga/order handleGetList:", e);
    yield put(orderActions.setMessageOrder([]));
  }
}
