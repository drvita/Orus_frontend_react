import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { categoryActions } from "..";

export default function* handleGetExam({ payload }) {
  try {
    const { id } = payload,
      result = yield call(api, `categories/${id}`, "GET");

    if (result.data) {
      yield put(categoryActions.setCategory(result.data));
    } else {
      console.error("[Orus System] Error in handle GET Contact", result);
      yield put(
        categoryActions.setMessageCategory([
          {
            type: "error",
            text: "al traer datos de contacto en la API",
          },
        ])
      );
    }
  } catch (e) {
    console.error("[Orus System] Error in handle GET Contact", e);
    yield put(
      categoryActions.setMessageCategory([
        {
          type: "error",
          text: "al traer datos de contacto, intentelo mas tarde",
        },
      ])
    );
  }
}
