import { TYPE } from "./types";

const LS = localStorage.getItem("OrusSystem"),
  {
    isLogged: IS_LOGGED = false,
    idUser: ID_USER = 0,
    username: USERNAME = null,
    name: NAME = null,
    rol: ROL = null,
    roles: ROLES = null,
    permissions: PERMISSIONS = null,
    email: EMAIL = null,
    token: TOKEN = null,
    branch: BRANCH = null,
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
      branch: BRANCH,
      roles: ROLES,
      permissions: PERMISSIONS,
    },
    options: {
      page: 1,
      orderby: "created_at",
      order: "desc",
      search: "",
      itemsPage: 10,
    },
    notifications: [],
    list: [],
    meta: { total: 0 },
    user: {},
    messages: [],
    loading: false,
    loading_notify: false,
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
        loading_notify: true,
      };
    }
    case TYPE.SAGA_READ_NOTIFYS: {
      return {
        ...state,
        loading_notify: true,
      };
    }
    case TYPE.SAGA_GET_LIST_USERS: {
      return {
        ...state,
        list: [],
        meta: {},
        loading: true,
      };
    }
    case TYPE.SAGA_GET_USER: {
      return {
        ...state,
        user: {},
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_CLEAR_TOKEN_USER: {
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
      let branch;
      if (data.branch && data.branch.id) {
        branch = {
          id: data.branch.id,
          ...data.branch.values,
        };
      }

      ls.isLogged = true;
      ls.idUser = data.id;
      ls.username = data.username;
      ls.name = data.name;
      ls.rol = data.rol;
      ls.roles = data.roles;
      ls.permissions = data.permissions;
      ls.email = data.email;
      ls.token = token ? token : ls.token;
      ls.branch = branch;
      localStorage.setItem("OrusSystem", JSON.stringify(ls));

      if (!state.dataLoggin.isLogged)
        console.log("[Orus System] Acceso a sistema exitoso", ls.username);
      return {
        ...state,
        dataLoggin: {
          ...ls,
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
      delete ls.branch;
      delete ls.roles;
      delete ls.permissions;

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
          roles: null,
          permissions: null,
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
        loading_notify: false,
        messages: [],
      };
    }
    case TYPE.SET_MESSAGES: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_LIST_USERS: {
      return {
        ...state,
        list: payload.data,
        meta: payload.meta,
        loading: false,
        messages: [],
      };
    }
    case TYPE.SET_OPTIONS_USERS: {
      const { key, value } = payload;

      return {
        ...state,
        options: {
          ...state.options,
          [key]: value,
        },
      };
    }
    case TYPE.SET_USER: {
      return {
        ...state,
        user: payload,
        list: [],
        meta: {},
        loading: false,
        messages: [],
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default loggin_state;
