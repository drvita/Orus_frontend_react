import { TYPE } from "./types";

const LS = localStorage.getItem("OrusSystem"),
  {
    isLogged: IS_LOGGED = false,
    idUser: ID_USER = 0,
    username: USERNAME = null,
    name: NAME = null,
    rol: ROL = null,
    email: EMAIL = null,
    token: TOKEN = null,
  } = JSON.parse(LS ? LS : "{}"),
  DEFAULT_STATE = {
    dataLoggin: {
      isLogged: IS_LOGGED,
      idUser: ID_USER,
      username: USERNAME,
      name: NAME,
      rol: ROL,
      email: EMAIL,
      token: TOKEN,
    },
    notifications: [],
    list: [],
    meta: {},
    user: {},
    messages: [],
    loading: false,
  };

const loggin_state = (state = DEFAULT_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case TYPE.SAGA_TRY_LOGING: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_CHECK_LOGING: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_NOTIFY: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_READ_NOTIFYS: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_LOGGIN: {
      const LS = localStorage.getItem("OrusSystem"),
        { data, token } = payload,
        { ls = {} } = {
          ls: JSON.parse(LS ? LS : "{}"),
        };
      ls.isLogged = true;
      ls.idUser = data.id;
      ls.username = data.username;
      ls.name = data.name;
      ls.rol = data.rol;
      ls.email = data.email;
      ls.token = token;
      localStorage.setItem("OrusSystem", JSON.stringify(ls));
      console.log("[Orus System] Acceso a sistema exitoso");
      return {
        ...state,
        dataLoggin: {
          isLogged: true,
          idUser: data.id,
          username: data.username,
          name: data.name,
          rol: data.rol,
          email: data.email,
          token: token,
        },
        loading: false,
      };
    }
    case TYPE.SET_LOGOUT: {
      const LS = localStorage.getItem("OrusSystem"),
        { ls = {} } = {
          ls: JSON.parse(LS ? LS : "{}"),
        };

      delete ls.email;
      delete ls.idUser;
      delete ls.isLogged;
      delete ls.name;
      delete ls.rol;
      delete ls.token;
      delete ls.username;

      localStorage.setItem("OrusSystem", JSON.stringify(ls));
      console.log("[Orus System] Cierre de sistema exitoso");
      return {
        ...state,
        dataLoggin: {
          isLogged: false,
          idUser: 0,
          username: null,
          name: null,
          rol: null,
          email: null,
          token: null,
        },
        notifications: [],
        list: [],
        meta: {},
        user: {},
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_NOTIFYS: {
      return {
        ...state,
        notifications: payload,
        loading: false,
        messages: [],
      };
    }
    case TYPE.SET_MESSAGES: {
      return {
        ...state,
        messages: payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default loggin_state;
