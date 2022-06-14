import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { saleActions } from "../index";

export default function* handleGetList({ payload }) {
  try {
    const url = getUrl("sales", null, payload),
      result = yield call(api, url);
    yield put(
      saleActions.setListSales({
        result: {
          list: result.data,
          metaList: result.meta,
        },
      })
    );
  } catch (e) {
    console.error("[Orus System] Error en saga/exam getList:", e);
    yield put(saleActions.setMessagesSale([]));
  }
}
