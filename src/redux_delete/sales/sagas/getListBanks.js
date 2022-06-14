import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { saleActions } from "../index";

export default function* handleGetList({ payload }) {
  try {
    const url = getUrl("config", null, {
        ...payload,
        name: "bank",
      }),
      result = yield call(api, url);

    yield put(saleActions.setListBanks(result.data));
  } catch (e) {
    console.error("[Orus System] Error en saga/banks handleGetList:", e);
    yield put(saleActions.setMessagesSale([]));
  }
}
