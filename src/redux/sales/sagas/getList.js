import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { examActions } from "../index";

export default function* handleGetList({ payload }) {
  try {
    const url = getUrl("exams", null, payload),
      result = yield call(api, url);
    yield put(
      examActions.setListExam({
        result: {
          list: result.data,
          metaList: result.meta,
        },
      })
    );
  } catch (e) {
    console.error("[Orus System] Error en saga/exam getList:", e);
    yield put(examActions.setMessagesExam([]));
  }
}
