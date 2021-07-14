import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { examActions } from "..";

export default function* handleGetExam({ payload: id }) {
  try {
    const result = yield call(api, `exams/${id}`, "GET");

    if (result.data) {
      yield put(examActions.setExam(result.data));
    } else {
      console.error("[OrusSystem] Error en handleGetExam", result);
    }
  } catch (e) {
    console.error("[OrusSystem] Error en saga/Exam handleGetExam", e);
    yield put(
      examActions.setMessagesExam([
        {
          type: "error",
          text: "al traer datos de contacto, intentelo mas tarde",
        },
      ])
    );
  }
}
