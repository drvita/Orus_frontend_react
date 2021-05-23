export const TRY_LOGGIN = "TRY_LOGGIN";
export const LOGGIN_SUCCESS = "LOGGIN_SUCCESS";
export const LOGGIN_ERROR = "LOGGIN_ERROR";
export const LOGGIN_DELETE = "LOGGIN_DELETE";

export const loggin = (payload) => ({
  type: TRY_LOGGIN,
  payload,
});
export const logginSuccess = (payload) => ({
  type: LOGGIN_SUCCESS,
  payload,
});
export const logginError = (payload) => ({
  type: LOGGIN_ERROR,
  payload,
});
export const logginDelete = (payload) => ({
  type: LOGGIN_DELETE,
  payload,
});
