import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { categoryActions } from "../index";

export default function* handleSaveCategory({ payload }) {
  try {
    const { data: DATA = {}, id: ID = null, options: OPT = {} } = payload,
      url = getUrl("categories", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) throw new Error(result.message);

    if (ID) console.log("[Orus System] Categoria actualizada con exito: " + ID);
    else
      console.log("[Orus system] Categoria creada con exito", result.data.id);

    yield put(
      categoryActions.setMessageCategory([
        {
          type: "success",
          text: ID
            ? "Categoria actualizada con exito"
            : "Categoria almacenada con exito",
        },
      ])
    );
    yield put(categoryActions.getListCategories(OPT));
  } catch (e) {
    console.error("[Orus System] Error saga/category handleSaveCategory", e);
    yield put(
      categoryActions.setMessageCategory([
        {
          type: "error",
          text: "al almacenar la categoria, intentelo mas tarde",
        },
      ])
    );
  }
}
