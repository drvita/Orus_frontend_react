/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../utils/url";

export const ConfigContext = createContext(null);
export const Config = () => useContext(ConfigContext);

const storage = JSON.parse(localStorage.getItem("OrusSystem"));

const initialState = {
  data: [],
  meta: {},
  branches: [],
  banks: [],
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
  const handleGetConfig = () => {
    return api("config?itemsPage=100", "GET").then((res) => res);
  };
  const handleSetState = async () => {
    const req = await handleGetConfig();
    const banks = req.data?.filter((con) => con.name === "bank");
    const reqBranches = req.data?.filter((con) => con.name === "branches");
    const branches = reqBranches.map((row) => ({ ...row.data, id: row.id }));

    setstate({
      ...state,
      data: req.data,
      meta: req.meta,
      branches,
      banks,
      setStorage,
    });
  };

  useEffect(() => {
    handleSetState();
  }, []);

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
}
