import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { examActions } from "../index";

export default function* handledDeleteContact({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = getUrl("exams", ID),
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Examen eliminado con exito", ID);
      yield put(
        examActions.setMessagesExam([
          {
            type: "success",
            text: "Examen eliminado con exito",
          },
        ])
      );
      console.log("[DEBUG] saga", options);
      yield put(
        examActions.getListExam({
          options,
        })
      );
    } else {
      console.error(
        "[Orus System] Fallo al eliminar el examen",
        result.message
      );

      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          examActions.setMessagesExam([
            {
              type: "error",
              text: "No se puede eliminar un examen que esta asignado",
              errnum: "SQL23000",
            },
          ])
        );
      } else {
        yield put(
          examActions.setMessagesExam([
            {
              type: "error",
              text: "No se puede eliminar el examen",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error in handle deleteOrder", e);
    yield put(
      examActions.setMessagesExam([
        {
          type: "error",
          text: "al eliminar el examen, intentelo mas tarde",
        },
      ])
    );
  }
}
