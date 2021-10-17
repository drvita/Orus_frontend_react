import { TYPE } from "./types";

const LS = localStorage.getItem("OrusSystem"),
  {
    port: PORT = window.location.protocol.toString().replace(":", ""),
    host: HOST = window.location.hostname,
    company: COMPANY = "optica madero",
  } = JSON.parse(LS ? LS : "{}"),
  DEFAULT_STATE = {
    port: PORT,
    host: HOST,
    company: COMPANY,
    namePage: "dashboard",
    success: undefined,
  };

const default_reducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case TYPE.CHANGE_HOST: {
      const LS = localStorage.getItem("OrusSystem"),
        {
          host: HOST = window.location.hostname,
          port: PORT = window.location.protocol.toString().replace(":", ""),
        } = payload,
        { ls = {} } = {
          ls: JSON.parse(LS ? LS : "{}"),
        };
      console.log("[Orus System] cambiando datos de host:", PORT, HOST);
      ls.port = PORT;
      ls.host = HOST;
      localStorage.setItem("OrusSystem", JSON.stringify(ls));
      return {
        ...state,
        port: PORT,
        host: HOST,
        success: true,
      };
    }
    case TYPE.CHANGE_PAGE: {
      return {
        ...state,
        namePage: payload,
      };
    }
    default:
      const LS = localStorage.getItem("OrusSystem"),
        { ls = {} } = {
          ls: JSON.parse(LS ? LS : "{}"),
        };
      ls.port = state.port;
      ls.host = state.host;
      ls.company = state.company;
      localStorage.setItem("OrusSystem", JSON.stringify(ls));
      return {
        ...state,
        success: undefined,
      };
  }
};

export default default_reducer;
