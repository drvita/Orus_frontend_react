import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { examActions } from "../index";

export default function* handledSave({ payload }) {
  try {
    const { id, data } = payload,
      url = getUrl("exams", id),
      method = id ? "PUT" : "POST",
      result = yield call(api, url, method, data);

    if (!result.message) {
      console.log("[Orus System] Examen almacenado con exito", result.data.id);
      yield put(
        examActions.setMessagesExam([
          {
            type: "success",
            text: id
              ? "Examen actualizado con exito"
              : "Examen almacenado con exito",
          },
        ])
      );
    } else {
      console.error(
        "[Orus System] Fallo al almacenar el examen",
        result.message
      );

      yield put(
        examActions.setMessagesExam([
          {
            type: "error",
            text: "No se puede almacenar el examen",
          },
        ])
      );
    }
  } catch (e) {
    console.error("[Orus System] Error in handle deleteOrder", e);
    yield put(
      examActions.setMessagesExam([
        {
          type: "error",
          text: "al almacenar el examen, intentelo mas tarde",
        },
      ])
    );
  }
}
