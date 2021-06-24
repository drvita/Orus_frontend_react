import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { examActions } from "../index";

export default function* handleGetList({ payload }) {
  try {
    const { options, id } = payload,
      url = getUrl("exams", id, options),
      result = yield call(api, url);
    //console.log("[DEBUG] saga exams list:", result.data);
    yield put(
      examActions.setListExam({
        result: {
          list: result.data,
          metaList: result.meta,
        },
        options,
      })
    );
  } catch (e) {
    console.error("[Orus System] Error en saga/exam getList:", e);
    yield put(examActions.setMessagesExam([]));
  }
}
