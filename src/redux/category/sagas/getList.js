import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { categoryActions } from "../index";

export default function* handleGetList({ payload }) {
  try {
    const { options, id } = payload,
      url = getUrl("categories", id, options),
      result = yield call(api, url);
    //console.log("[DEBUG] saga exams list:", result.data);
    yield put(
      categoryActions.setListCategories({
        result: {
          list: result.data,
          metaList: result.meta,
        },
      })
    );
  } catch (e) {
    console.error("[Orus System] Error en saga/exam getList:", e);
    yield put(categoryActions.setMessageCategory([]));
  }
}
