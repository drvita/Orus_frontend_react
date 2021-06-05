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
    isLogged: IS_LOGGED,
    idUser: ID_USER,
    username: USERNAME,
    name: NAME,
    rol: ROL,
    email: EMAIL,
    token: TOKEN,
    errors: {},
    notifications: [],
  };

const loggin_state = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.LOGING_SUCCESS: {
      const LS = localStorage.getItem("OrusSystem"),
        { data, token } = action.payload,
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
        isLogged: true,
        idUser: data.id,
        username: data.username,
        name: data.name,
        rol: data.rol,
        email: data.email,
        token: token,
        errors: {},
      };
    }
    case TYPE.LOGING_DELETE: {
      const LS = localStorage.getItem("OrusSystem"),
        { ls = {} } = {
          ls: JSON.parse(LS ? LS : "{}"),
        };
      delete ls.isLogged;
      delete ls.idUser;
      delete ls.username;
      delete ls.name;
      delete ls.rol;
      delete ls.email;
      delete ls.token;
      localStorage.setItem("OrusSystem", JSON.stringify(ls));
      console.log("[Orus System] Cierre de sistema exitoso");
      return {
        ...state,
        isLogged: false,
        idUser: 0,
        username: null,
        name: null,
        rol: null,
        email: null,
        token: null,
        errors: {},
      };
    }
    case TYPE.LOGING_ERROR: {
      const errors = action.payload;
      return {
        ...state,
        errors,
      };
    }
    case TYPE.GET_NOTIFYS: {
      const notifications = action.payload;
      return {
        ...state,
        notifications,
      };
    }

    default:
      return {
        ...state,
        errors: {},
      };
  }
};

export default loggin_state;
