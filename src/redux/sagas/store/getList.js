import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../api";
import { setListStore, setMessagesStore } from "../../store/actions";

export default function* handleGetList({ payload }) {
  try {
    const { options, id } = payload,
      url = getUrl("store", id, options),
      result = yield call(api, url);
    //console.log("[DEBUG] saga setStore:", result);
    yield put(
      setListStore({
        result: {
          list: result.data,
          metaList: result.meta,
        },
        options,
      })
    );
  } catch (e) {
    console.error("[Orus System] Error en saga/store getList:", e);
    yield put(setMessagesStore([]));
  }
}
