import {TYPE} from "./types";

export const loggin = (payload) => ({
    type: TYPE.SAGA_TRY_LOGING,
    payload,
});
export const checkLogging = (payload) => ({
    type: TYPE.SAGA_CHECK_LOGING,
    payload,
});

export const getNotifyUser = (payload) => ({
    type: TYPE.SAGA_GET_NOTIFY,
    payload,
});
export const readNotifyUser = (payload) => ({
    type: TYPE.SAGA_READ_NOTIFYS,
    payload,
});