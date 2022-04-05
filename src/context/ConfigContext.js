/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { api } from "../utils/url";

export const ConfigContext = createContext(null);
const LS = localStorage.getItem("OrusSystem");
const storage = LS ? JSON.parse(LS) : {};
const initialState = {
  data: [],
  meta: {},
  server: storage,
};

export default function useConfig({ children }) {
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    api("config?itemsPage=100", "GET").then((response) => {
      setstate({
        ...state,
        data: response.data,
        meta: response.meta,
      });
    });
  }, []);

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
}
