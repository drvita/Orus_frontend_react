import { call, put } from "redux-saga/effects";
import {
    TYPE,
} from "../../user/types";
import {api} from "../api";

export default function* handleLoggin(user) {
    try {
        console.log("[Orus System] Consultando loggin en la API");
        if (user.payload) {
            const result = yield call(
                api,
                "user",
            );
            if (result.message && result.message === "Unauthenticated.") {
                console.log("[Orus System] Token de usuario no valido");
                yield put({
                    type: TYPE.LOGING_DELETE,
                    payload: null,
                });
            } else {
                console.log("[Orus System] Verificacion de usuario correcta", result.data.username);
            }
        } else {
            console.error("[Orus System] Error en el token de usuario:", user.payload);
            yield put({
                type: TYPE.LOGING_DELETE,
                payload: null,
            });
        }
    } catch (e) {
        console.error("[Orus System] Error in handle check loggin", e);
    }
}