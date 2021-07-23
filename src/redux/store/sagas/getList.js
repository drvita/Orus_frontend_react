import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleGetList({ payload: options }) {
  try {
    const url = getUrl("store", null, options),
      result = yield call(api, url);

    yield put(
      storeActions.setListStore({
        result: {
          list: result.data,
          metaList: result.meta,
        },
      })
    );
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/store handleGetList:",
      e.message
    );
    yield put(storeActions.setMessagesStore([]));
  }
}
