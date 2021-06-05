import { call, put } from "redux-saga/effects";
import {
    TYPE,
} from "../../user/types";
import {api} from "../api";

export default function* handleLoggin(credenciales) {
    try {
        console.log("[Orus System] Consultando credenciales en la API");
        if (credenciales.payload.email && credenciales.payload.password) {
            const result = yield call(
                api,
                "users/login",
                "POST",
                credenciales.payload
            );
            if (result.data) {
                console.log("[Orus System] Servidor:", result.message);
                yield put({
                    type: TYPE.LOGING_SUCCESS,
                    payload: result,
                });
            } else {
                console.error(
                    "[Orus System] Fallo la validacion de credenciales en servidor",
                    result
                );
                yield put({
                    type: TYPE.LOGING_ERROR,
                    payload: {
                        errors: "Error de procesamiento, llame al administrador",
                        result,
                    },
                });
            }
        } else {
            yield put({
                type: TYPE.LOGING_DELETE,
                payload: null,
            });
        }
    } catch (e) {
        console.error("[Orus System] Error in handle loggin", e);
        yield put({
            type: TYPE.LOGING_ERROR,
            payload: {
                errors: "Error al conectarse al servidor, compruebe que tiene internet",
                errornum: 500,
            },
        });
    }
}