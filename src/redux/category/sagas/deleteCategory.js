import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { categoryActions } from "../index";

export default function* handledDeleteCategory({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = `categories/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Categoria eliminada con exito", ID);
      yield put(
        categoryActions.setMessageCategory([
          {
            type: "success",
            text: "Marca eliminada con exito",
          },
        ])
      );
      yield put(categoryActions.getListCategories(options));
    } else {
      console.error(
        "[Orus System] Fallo al eliminar la categoria: " + ID,
        result.message
      );
      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          categoryActions.setMessageCategory([
            {
              type: "error",
              text: "No se puede eliminar una categoria que ya esta relacionado con un producto",
              errnum: "SQL23000",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/category handledDeleteCategory",
      e
    );
    yield put(
      categoryActions.setMessageCategory([
        {
          type: "error",
          text: "al eliminar la categoria, intentelo mas tarde",
        },
      ])
    );
  }
}
