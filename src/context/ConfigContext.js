/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { api } from "../utils/url";

export const ConfigContext = createContext(null);
const storage = JSON.parse(localStorage.getItem("OrusSystem"));
const initialState = {
  data: [],
  meta: {},
  server: storage,
};

export default function useConfig({ children }) {
  const [state, setstate] = useState(initialState);
  // Functions
  const setStorage = (storage) => {
    if (typeof storage !== "object") {
      return false;
    }

    const newStorage = {
      ...state.server,
      ...storage,
    };

    setstate({
      ...state,
      server: newStorage,
    });
    localStorage.setItem("OrusSystem", JSON.stringify(newStorage));
    return true;
  };

  useEffect(() => {
    api("config?itemsPage=100", "GET").then((response) => {
      setstate({
        ...state,
        data: response.data,
        meta: response.meta,
        setStorage,
      });
    });
  }, []);

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
}
