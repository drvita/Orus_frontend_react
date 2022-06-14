import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { saleActions } from "../index";

export default function* handleGetSale({ payload: ID }) {
  try {
    const url = getUrl("sales", ID),
      result = yield call(api, url);

    if (result.data) {
      console.log("[Orus System] Estableciendo venta", ID);
      yield put(saleActions.setSale(result.data));
    }
  } catch (e) {
    console.error("[Orus System] Error en saga/sale handleGetSale:", e.message);
    yield put(saleActions.setMessagesSale([]));
  }
}
