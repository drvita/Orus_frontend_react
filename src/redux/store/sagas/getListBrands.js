import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleGetListBrands({ payload: options }) {
  try {
    const url = getUrl("brands", null, options),
      result = yield call(api, url);

    if (result.data) {
      yield put(storeActions.setListBrand(result.data));
    }
  } catch (e) {
    console.error("[Orus System] Error en saga handleGetListBrands:", e);
    yield put(storeActions.setMessagesStore([]));
  }
}
